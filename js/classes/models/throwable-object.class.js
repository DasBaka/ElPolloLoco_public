class ThrowableObject extends JumpableObject {
   data = throwableObjectData;
   world;

   rightAcceleration = false;
   leftAcceleration = false;

   constructor(world) {
      super().fetchData();
      this.loadImage(this.path);
      this.prepareImage();
      this.setWorld(world);
      this.loadAnimations();
   }

   setWorld() {
      this.world = world;
      let char = this.world.character;
      this.y = char.y + char.h * 0.5;
      this.x = char.x + char.w * this.bottlePosition(char.otherDirection);
      this.setBottleAcceleration(char);
   }

   bottlePosition(otherDir) {
      if (otherDir) {
         return bottleLeftSidePosition;
      } else {
         return bottleRightSidePosition;
      }
   }

   setBottleAcceleration(char) {
      this.rightAcceleration = char.validateRight();
      this.leftAcceleration = char.validateLeft();
      this.otherDirection = char.otherDirection;
   }

   left() {
      if (this.speed != 0 && this.otherDirection) {
         this.moveLeft();
      }
   }

   right() {
      if (this.speedX != 0 && !this.otherDirection) {
         this.moveRight();
      }
   }

   validateOnGround() {
      return THROW && this.speedX_rel == 0 && this.health != 0;
   }

   startJump() {
      if (this.validateOnGround()) {
         if (this.world.character.validateInAir()) {
            this.throwMidAir();
         } else if (this.rightAcceleration || this.leftAcceleration) {
            this.throwWithSpeed();
         } else {
            this.throwOnIdle();
         }
      }
   }

   throwMidAir() {
      this.speedX_rel = pepeSpeed * 2.0;
      this.speedY_rel = 0.0125;
   }

   throwWithSpeed() {
      this.speedX_rel = pepeSpeed * 4;
      this.speedY_rel = 0.007;
   }

   throwOnIdle() {
      this.speedX_rel = pepeSpeed * 1.5;
      this.speedY_rel = 0.01;
   }

   validateInAir() {
      return this.health != 0;
   }

   validateBackOnGround() {
      return this.y > groundLevel - this.h || this.health == 0;
   }

   isHit() {
      this.health = 0;
      this.speedY_rel = 0;
      this.speedX_rel = 0;
      this.refreshSpeed();
   }

   endGravity() {
      this.isHit();
      this.y = this.y + 0.33 * this.h;
      this.endInterval(this.movementInterval);
      this.endInterval(this.jumpInterval);
   }

   isFalling() {
      return true;
   }
}

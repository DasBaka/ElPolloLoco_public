class Character extends JumpableObject {
   data = characterClassData;
   isAbove = false;

   world;

   constructor(world) {
      super().fetchData();
      this.loadImage(this.path);
      this.world = world;
      this.prepareImage();
      this.loadAnimations();
   }

   // move world camera
   cameraCheck() {
      if (this.levelIsNotEnding() && this.health != 0) {
         this.moveCamera();
      } else if (this.health != 0) {
         RIGHT_disabled = true;
      }
   }

   levelIsNotEnding() {
      return this.world.levelEnd + this.world.cameraX - this.spawnX > -this.world.cameraX;
   }

   moveCamera() {
      this.world.cameraX = -this.x + canvasWidth * this.x_rel;
   }

   // movement
   left() {
      if (this.validateLeft()) {
         this.moveLeft();
         this.world.levelEnd -= this.world.groundMaxSpeed;
         this.otherDirection = true;
      } else if (this.x < this.spawnX) {
         this.x = this.spawnX;
         LEFT_disabled = true;
      }
   }

   validateLeft() {
      return LEFT && !LEFT_disabled && this.x > this.spawnX;
   }

   right() {
      if (this.validateRight()) {
         this.moveRight();
         this.world.levelEnd += this.world.groundMaxSpeed;
         this.otherDirection = false;
      }
   }

   validateRight() {
      return RIGHT && !RIGHT_disabled && this.levelIsNotEnding();
   }

   // animation states
   isWalking() {
      return (this.validateLeft() || this.validateRight()) && !JUMP && this.y == this.spawnY;
   }

   isJumping() {
      return this.inAir;
   }

   isFalling() {
      return this.speedY_rel < 0 && this.inAir;
   }

   isHurt() {
      return this.invulnerability();
   }

   characterGotHit() {
      return this.invulnerability();
   }

   isLongIdle() {
      return this.timePassed(this.idleSince, 10);
   }

   mtplBtnPress() {
      return LEFT && RIGHT;
   }

   validateJumpBtn() {
      return JUMP && !JUMP_disabled && !this.isAbove;
   }

   isInvincibleWhileJumping() {
      return !this.world.character.invulnerability() && this.world.character.speedY < 15;
   }

   isCharacterDead() {
      if (this.health == 0) {
         this.world.enemies.forEach((enemy) => {
            enemy.endInterval(enemy.movementInterval);
            enemy.endInterval(enemy.animationInterval);
            enemy.endInterval(enemy.jumpInterval);
         });
      }
   }

   endGravity() {
      super.endGravity();
      this.isAbove = false;
   }
}
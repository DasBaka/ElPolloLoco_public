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

   /**
    * Sets world to itself to calculate its current position + speed when it'll be generated.
    */
   setWorld(world) {
      this.world = world;
      let char = this.world.character;
      this.y = char.y + char.h * 0.5;
      this.x = char.x + char.w * this.bottlePosition(char.otherDirection);
      this.setBottleAcceleration(char);
   }

   /**
    * Defines position adjustment depending on the throw direction.
    * @param {boolean} otherDir - face direction of the character
    * @returns - number (to recalculate x position)
    */
   bottlePosition(otherDir) {
      if (otherDir) {
         return bottleLeftSidePosition;
      } else {
         return bottleRightSidePosition;
      }
   }

   /**
    * Sets parameter to define the throw direction.
    * @param {object} char - character class object
    */
   setBottleAcceleration(char) {
      this.rightAcceleration = char.validateRight();
      this.leftAcceleration = char.validateLeft();
      this.otherDirection = char.otherDirection;
   }

   /**
    * Left move.
    */
   left() {
      if (this.speed != 0 && this.otherDirection) {
         this.moveLeft();
      }
   }

   /**
    * Right move.
    */
   right() {
      if (this.speedX != 0 && !this.otherDirection) {
         this.moveRight();
      }
   }

   /**
    * Checks is the Bottle can be thrown.
    * @returns - boolean
    */
   validateOnGround() {
      return THROW && this.speedX_rel == 0 && this.health != 0;
   }

   /**
    * Fires, if object condition is true and starts a throw alias "jump".
    * Triggers another function depending on the characters movement.
    */
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

   /**
    * Bottle's stats while thrown in mid air.
    */
   throwMidAir() {
      this.speedX_rel = pepeSpeed * 1.8;
      this.speedY_rel = 0.01;
   }

   /**
    * Bottle's stats while thrown while moving on the ground.
    */
   throwWithSpeed() {
      this.speedX_rel = pepeSpeed * 3.6;
      this.speedY_rel = 0.006;
   }

   /**
    * Bottle's stats while thrown while idle.
    */
   throwOnIdle() {
      this.speedX_rel = pepeSpeed * 1.6;
      this.speedY_rel = 0.008;
   }

   /**
    * Checks if throwable-object still flies.
    * @returns - boolean
    */
   validateInAir() {
      return this.health != 0;
   }

   /**
    * Checks for a collision with the ground or indirectly enemy (object's health = 0).
    * @returns - boolean
    */
   validateBackOnGround() {
      return this.y > groundLevel - this.h || this.health == 0;
   }

   /**
    * Stats on collision.
    */
   isHit() {
      this.health = 0;
      this.speedY_rel = 0;
      this.speedX_rel = 0;
      this.refreshSpeed();
   }

   /**
    * Individual end of this objects gravity. (also see: {@link JumpableObject.endGravity})
    */
   endGravity() {
      this.isHit();
      this.world.playAudio(BOTTLE_BREAKS_AUDIO);
      this.y = this.y + 0.33 * this.h;
      this.endInterval(this.movementInterval);
      this.endInterval(this.jumpInterval);
   }

   /**
    * This object is always "resulting".
    * Relevant for its animation.
    * @returns - true
    */
   isFalling() {
      return true;
   }
}

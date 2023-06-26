class JumpableObject extends AnimatableObject {
   speedY;
   speedY_rel = 0;

   inAir = false;

   /**
    * Interval to check for the jump condition.
    */
   jumpInterval = setInterval(() => {
      this.jump();
   }, msPerMove);

   constructor() {
      super();
   }

   /**
    * In addition to {@link MovableObject.refreshSpeed} it now also recalculates the objects speedY.
    */
   refreshSpeed() {
      super.refreshSpeed();
      let speedY = canvasWidth * this.speedY_rel;
      if (Math.abs(speedY) < 1) {
         this.speedY = speedY;
      } else {
         this.speedY = Math.round(speedY);
      }
   }

   /**
    * Jump function.
    * Normally it just fires one or two function/s depending on the state of the jump (start, first half, peak, second half, landing).
    */
   jump() {
      this.startJump();
      this.gainJumpHeight();
      this.reachPeakHeight();
      this.inJumpPhase();
      this.endJump();
   }

   /**
    * Like {@link jump}, but with a smaller coefficient.
    * Used to indicate a special feedback if hit / lost all health.
    */
   bump() {
      if (this.speedY_rel <= 0) {
         this.speedY_rel *= bumpCoeff;
      }
   }

   /**
    * "Death animation".
    * If the object reaches 0 health, this function lets the object do a small jump upwards before leaving the screen to the bottom.
    * => ignores the {@link endJump} function!
    */
   noHealthJump() {
      this.inAir = true;
      this.speedY_rel = speedAfterHit;
      this.refreshSpeed();
   }

   /**
    * Fires, if object condition is true and starts a jump.
    */
   startJump() {
      if (this.validateOnGround()) {
         this.speedY_rel = this.calcSpeed();
         this.inAir = true;
         if (this instanceof Character && !this.invulnerability()) {
            playPepeJumpGrunt();
            playPepeJumpingSound();
         }
      }
   }

   /**
    * Calculates the speed of a jump, depending on a button press or collision.
    * @returns - num
    */
   calcSpeed() {
      if (this.characterGotHit()) {
         return speedAfterHit;
      } else {
         return pepeJumpSpeed;
      }
   }

   /**
    * Fires, if condition is true and gives the object a longer jump / more height.
    */
   gainJumpHeight() {
      if (this.validateExtraSpeed()) {
         this.speedY_rel += acceleration / 2;
      }
   }

   /**
    * Fires, if condition is true and triggers the "falling" state:
    * a) disables the jump button to get more height
    * b) allows the object to hit other objects from above with isAbove.
    */
   reachPeakHeight() {
      if (this.validateBehindPeakHeight()) {
         JUMP_disabled = true;
         this.isAbove = true;
         if (this instanceof Character) {
            PEPE_JUMP_AUDIO.pause();
         }
      }
   }

   /**
    * Applies gravity if in air.
    * Applies all the time while jumping.
    */
   inJumpPhase() {
      if (this.validateInAir()) {
         this.applyGravity();
      }
   }

   /**
    * Fires, if condition is true and ends the jump.
    * Plays an animation, if the object is a Character.
    */
   endJump() {
      if (this.validateBackOnGround()) {
         if (this instanceof Character && !this.invulnerability()) {
            this.playAnimation(this.landing);
         }
         this.endGravity();
      }
   }

   /**
    * Logic: Is on ground.
    * @returns - boolean
    */
   validateOnGround() {
      return (
         this.y == this.spawnY && !this.inAir && (this.validateJumpBtn() || this.characterGotHit())
      );
   }

   /**
    * Logic: Is in air.
    * @returns - boolean
    */
   validateInAir() {
      return this.inAir;
   }

   /**
    * Validates for extra jump speed for the Character if the jump button is pressed in the first half of a jump.
    * @returns - boolean
    */
   validateExtraSpeed() {
      return (
         this.inAir && this.speedY_rel > 0 && this.validateJumpBtn() && this instanceof Character
      );
   }

   /**
    * Logic: Is the object already falling?
    * @returns - boolean
    */
   validateBehindPeakHeight() {
      return this.speedY < 0 && this.inAir && !this.isAbove && this instanceof Character;
   }

   /**
    * Logic: The object has touched the ground and is not dead.
    * @returns - boolean
    */
   validateBackOnGround() {
      return this.inAir && this.y >= this.spawnY && this.health > 0;
   }

   /**
    * Gravity function.
    * Subtracts the gravity acceleration from the jump acceleration.
    */
   applyGravity() {
      this.refreshSpeed();
      this.y -= this.speedY;
      this.speedY_rel -= acceleration;
   }

   /**
    * Ends the jumps and resets everything relevant to the state before the jump.
    */
   endGravity() {
      this.inAir = false;
      this.y = this.spawnY;
      this.speedY_rel = 0;
      this.refreshSpeed();
      JUMP_disabled = false;
   }

   /**
    * => see: {@link Character.validateJumpBtn}
    * @returns - boolean
    */
   validateJumpBtn() {
      return false;
   }

   /**
    * => see: {@link Character.characterGotHit}
    * @returns boolean
    */
   characterGotHit() {
      return false;
   }
}

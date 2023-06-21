class JumpableObject extends AnimatableObject {
   speedY;
   speedY_rel = 0;

   inAir = false;

   jumpInterval = setInterval(() => {
      this.jump();
   }, msPerMove);

   constructor() {
      super();
   }

   refreshSpeed() {
      super.refreshSpeed();
      let speedY = canvasWidth * this.speedY_rel;
      if (Math.abs(speedY) < 1) {
         this.speedY = speedY;
      } else {
         this.speedY = Math.round(speedY);
      }
   }

   jump() {
      this.startJump();
      this.gainJumpHeight();
      this.reachPeakHeight();
      this.inJumpPhase();
      this.endJump();
   }

   bump() {
      if (this.speedY_rel <= 0) {
         this.speedY_rel *= bumpCoeff;
      }
   }

   noHealthJump() {
      this.inAir = true;
      this.speedY_rel = speedAfterHit;
      this.refreshSpeed();
   }

   startJump() {
      if (this.validateOnGround()) {
         this.speedY_rel = this.calcSpeed();
         this.inAir = true;
      }
   }

   calcSpeed() {
      if (this.characterGotHit()) {
         return speedAfterHit;
      } else {
         return pepeJumpSpeed;
      }
   }

   gainJumpHeight() {
      if (this.validateExtraSpeed()) {
         console.log(this.validateJumpBtn());
         this.speedY_rel += acceleration / 2;
      }
   }

   reachPeakHeight() {
      if (this.validateBehindPeakHeight()) {
         console.log('nani');
         JUMP_disabled = true;
         this.isAbove = true;
      }
   }

   inJumpPhase() {
      if (this.validateInAir()) {
         this.applyGravity();
      }
   }

   endJump() {
      if (this.validateBackOnGround()) {
         if (this instanceof Character) {
            console.log(this.validateJumpBtn());
         }
         if (this instanceof Character && !this.invulnerability()) {
            this.playAnimation(this.landing);
         }
         this.endGravity();
      }
   }

   validateOnGround() {
      return (
         this.y == this.spawnY && !this.inAir && (this.validateJumpBtn() || this.characterGotHit())
      );
   }

   validateInAir() {
      return this.inAir;
   }

   validateExtraSpeed() {
      return (
         this.inAir && this.speedY_rel > 0 && this.validateJumpBtn() && this instanceof Character
      );
   }

   validateBehindPeakHeight() {
      return this.speedY < 0 && this.inAir && !this.isAbove && this instanceof Character;
   }

   validateBackOnGround() {
      return this.inAir && this.y >= this.spawnY && this.health > 0;
   }

   applyGravity() {
      this.refreshSpeed();
      this.y -= this.speedY;
      this.speedY_rel -= acceleration;
   }

   endGravity() {
      this.inAir = false;
      this.y = this.spawnY;
      this.speedY_rel = 0;
      this.refreshSpeed();
      JUMP_disabled = false;
   }

   validateJumpBtn() {
      return false;
   }

   characterGotHit() {
      return false;
   }
}

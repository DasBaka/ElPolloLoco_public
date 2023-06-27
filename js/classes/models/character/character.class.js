class Character extends JumpableObject {
   data = characterClassData;
   isAbove = false;
   snoringInterval;

   world;

   /**
    * Interval for setting timestamps if object is idle.
    */
   idleInterval = setInterval(() => {
      this.setIdleTime();
   }, msPerCheck);

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
         this.world.levelEnd -= this.speedX;
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
         this.world.levelEnd += this.speedX;
         this.otherDirection = false;
      }
   }

   validateRight() {
      return RIGHT && !RIGHT_disabled && this.levelIsNotEnding();
   }

   // animation states
   isWalking() {
      if (this.validateWalking()) {
         if (PEPE_WALKING_AUDIO.object.paused) {
            this.world.playAudio(PEPE_WALKING_AUDIO);
         }
      } else {
         PEPE_WALKING_AUDIO.object.pause();
      }
      return this.validateWalking();
   }

   validateWalking() {
      return (
         (this.validateLeft() || this.validateRight()) &&
         !JUMP &&
         !this.inAir &&
         this.y == this.spawnY &&
         !this.mtplBtnPress()
      );
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

   isCharacterDead(bossDown) {
      if (this.health == 0 || bossDown) {
         this.world.characterIsDead(bossDown);
      }
   }

   endGravity() {
      super.endGravity();
      this.isAbove = false;
   }

   snoring() {
      this.otherDirection = false;
      this.world.playAudio(SNORE_AUDIO);
      this.playAnimation(this.longIdle);
      this.cancelSnoring();
   }

   cancelSnoring() {
      if (this.snoringInterval == undefined) {
         this.snoringInterval = setInterval(() => {
            if (!this.isLongIdle()) {
               SNORE_AUDIO.object.pause();
               clearInterval(this.snoringInterval);
               this.snoringInterval = undefined;
            }
         }, msPerCheck);
      }
   }
}

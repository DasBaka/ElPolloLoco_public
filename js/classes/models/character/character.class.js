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

   /**
    * Checks, if the world's camera should be moved or not.
    */
   cameraCheck() {
      if (this.levelIsNotEnding() && this.health != 0) {
         this.moveCamera();
      } else if (this.health != 0) {
         RIGHT_disabled = true;
      }
   }

   /**
    * 1.) Defines the end of the level, where the camera and the character won't move further.
    * 2.) Enables walking to the left if the end is reached and to prevent graphical glitches with the background there.
    * @returns boolean
    */
   levelIsNotEnding() {
      return this.x + canvasWidth < this.world.levelEnd || this.validateLeft();
   }

   /**
    * Moves the camera of {@link World.cameraX} to move the visible game world.
    */
   moveCamera() {
      this.world.cameraX = -this.x + canvasWidth * this.x_rel;
   }

   /**
    * => see {@link MovableObject.left()}
    */
   left() {
      if (this.validateLeft()) {
         this.moveLeft();
         this.otherDirection = true;
      } else if (this.x < this.spawnX) {
         this.x = this.spawnX;
         LEFT_disabled = true;
      }
   }

   /**
    * => see {@link MovableObject.validateLeft()}
    */
   validateLeft() {
      return LEFT && !LEFT_disabled && this.x > this.spawnX;
   }

   /**
    * => see {@link MovableObject.right()}
    */
   right() {
      if (this.validateRight()) {
         this.moveRight();
         this.otherDirection = false;
      }
   }

   /**
    * => see {@link MovableObject.validateRight()}
    */
   validateRight() {
      return RIGHT && !RIGHT_disabled && this.levelIsNotEnding();
   }

   /**
    * => see {@link AnimatableObject.isWalking()}
    * Also: Plays the walking sound.
    */
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

   /**
    * Condition for walking state of Character.
    * @returns boolean
    */
   validateWalking() {
      return (
         (this.validateLeft() || this.validateRight()) && // no btn press
         !JUMP && // no jump
         !this.inAir && // not in air
         this.y == this.spawnY && // not at the beginning
         !this.mtplBtnPress() // no simultaneas btn press
      );
   }

   /**
    * => see {@link AnimatableObject.isJumping()}
    */
   isJumping() {
      return this.inAir;
   }

   /**
    * => see {@link AnimatableObject.isFalling()}
    */
   isFalling() {
      return this.speedY_rel < 0 && this.inAir;
   }

   /**
    * => see {@link AnimatableObject.isHurt()}
    */
   isHurt() {
      return this.invulnerability();
   }

   /**
    * Condition to let the character got hit
    * @returns boolean
    */
   characterGotHit() {
      return this.invulnerability();
   }

   /**
    * => see {@link AnimatableObject.isLongIdle()}
    */
   isLongIdle() {
      return this.timePassed(this.idleSince, 10);
   }

   /**
    * "Prevents synchronous button presses" of LEFT and RIGHT
    * @returns boolean
    */
   mtplBtnPress() {
      return LEFT && RIGHT;
   }

   /**
    * Only triggers the JUMP button, with the following condition.
    * @returns boolean
    */
   validateJumpBtn() {
      return JUMP && !JUMP_disabled && !this.isAbove;
   }

   /**
    * It gives the character a short time frame, in which he can't get hit an triggering the jump.
    * @returns boolean
    */
   isInvincibleWhileJumping() {
      return !this.world.character.invulnerability() && this.world.character.speedY < 15;
   }

   /**
    * Checks, if the character died and prepares the end game screen according to it.
    * @param {boolean} bossDown - If the boss is defeated, it'll be true and triggers the winning state of the end game screen.
    */
   isCharacterDead(bossDown) {
      if (this.health == 0 || bossDown) {
         this.world.characterIsDead(bossDown);
      }
   }

   /**
    *  => see {@link JumpableObject.endGravity()}
    */
   endGravity() {
      super.endGravity();
      this.isAbove = false;
   }

   /**
    * Special animation for Character.
    * Snores if idle for too long.
    */
   snoring() {
      this.otherDirection = false;
      this.world.playAudio(SNORE_AUDIO);
      this.playAnimation(this.longIdle);
      this.cancelSnoring();
   }

   /**
    * Resets the snoring Audio.
    */
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

   /**
    * Ends every relevant interval related to Character.
    */
   endCharacterIntervals() {
      this.isCharacterDead(true);
      this.endInterval(this.movementInterval);
      this.endInterval(this.animationInterval);
      this.endInterval(this.jumpInterval);
   }
}

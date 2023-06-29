class BigChicken extends MediumChicken {
   data = bigChickenClassData;
   maxHealth = this.data['maxHealth'];
   resizingAmount = this.data['resizingAmount'];
   originalSize;
   world;
   hasSeenTheCharacter = false;

   resizePointY;
   resizingState;

   /**
    * Interval for resizing checks.
    * If the boss looses health, a resizing effect starts to equally adjust it's size to it's remaining health.
    */
   resizeInterval = setInterval(() => this.canResize(), msPerCheck);

   /**
    * Interval for two stats of the BossChicken.
    * => see {@link stateCheck()}
    */
   stateCheckInterval = setInterval(() => {
      this.stateCheck();
   }, msPerCheck);

   constructor(spawn) {
      super().fetchData();
      this.hasSeenTheCharacter = false;
      this.loadImage(this.path);
      this.prepareImage();
      this.y += 0.05 * canvasHeight;
      this.defineResizeOrigins(this.y, this.h);
      this.letSpawn(spawn);
      this.loadAnimations();
   }

   /**
    * Function of {@link stateCheckInterval}
    * 1.) One time function to activate, as soon as the player arrives at the boss.
    * 2.) The boss is defeated.
    */
   stateCheck() {
      if (this.isInsideCanvas(this.x) && !this.hasSeenTheCharacter) {
         this.characterSeen();
      } else if (this.health == 0 && !KEYS_disabled) {
         this.bossDefeated();
      }
   }

   /**
    * Plays audio and silences the other BGM, as well as trigger the "hasSeenTheCharacter" variable.
    */
   characterSeen() {
      this.world.audio.playAudio(BOSS_BGM_AUDIO);
      this.hasSeenTheCharacter = true;
      this.world.audio.silenceBGM(BGM_AUDIO, false);
   }

   /**
    * Resize function for {@link resizeInterval}
    * The new size is always equal to the ratio of remaining health / max health.
    * Is self-cleared, as soon as the boss vanishes.
    */
   canResize() {
      let ratio = this.w / this.h;
      if (this.hasLostHealth()) {
         this.resize(ratio);
      } else if (this.sizeRatio() < 0) {
         clearInterval(this.resizeInterval);
      } else if (this.healthRatio() == this.sizeRatio() && this.resizingState) {
         this.newSizeReached(ratio);
      }
   }

   /**
    * Boss has lost health.
    * @returns boolean.
    */
   hasLostHealth() {
      return this.healthRatio() < this.sizeRatio();
   }

   /**
    * => see {@link AnimatableObject.isHurt()}
    */
   isHurt() {
      return this.resizingState;
   }

   /**
    * Resize function. Resizing speed is determined by {@link resizingAmount}
    * @param {num} ratio - image ratio
    */
   resize(ratio) {
      this.resizingState = true;
      this.h -= (1 / this.resizingAmount) * canvasHeight;
      this.adjustParameterToOwnHeight(ratio);
   }

   /**
    * Adjust the image's stats to the new end size.
    * @param {num} ratio - image ratio
    */
   newSizeReached(ratio) {
      this.h = +this.originalSize * +this.healthRatio();
      this.adjustParameterToOwnHeight(ratio);
      this.resizePointY = this.y + this.h;
      this.resizingState = false;
      this.refreshSpeedAfterResize();
   }

   /**
    * => see {@link MovableObject.left()}
    */
   left() {
      if (!this.resizingState) {
         super.left();
      }
   }

   /**
    * => see {@link MovableObject.validateLeft()}
    */
   validateLeft() {
      return this.isInsideCanvas(this.x) || this.hasSeenTheCharacter;
   }

   /**
    * => see {@link SmallChicken.stayAtSpawn()}
    */
   stayAtSpawn() {
      super.stayAtSpawn();
      BOSS_BGM_AUDIO.object.pause();
   }

   /**
    * While {@link resize()} only alters this.h, this function alters every other stat of the BossChicken's image.
    * @param {*} ratio
    */
   adjustParameterToOwnHeight(ratio) {
      let oldWidth = this.w;
      this.w = ratio * this.h;
      this.x = this.x + 0.5 * (oldWidth - this.w);
      this.y = this.resizePointY - this.h;
      this.spawnY = this.y;
   }

   /**
    * Fastens the boss (after finishing the resize).
    */
   refreshSpeedAfterResize() {
      this.speedX_rel = this.speedX_rel * 1.75;
      this.refreshSpeed();
   }

   /**
    * => see {@link JumpableObject.jump()}
    */
   jump() {
      if (!this.resizingState) {
         super.jump();
      }
   }

   /**
    * Recalculates the reference paramater for resizing.
    * @param {imgY} y - img y
    * @param {imgHeight} h - img height
    */
   defineResizeOrigins(y, h) {
      this.resizePointY = y + 0.975 * h;
      this.originalSize = h;
      this.resizingState = false;
   }

   /**
    * Health ratio.
    * @returns boolean
    */
   healthRatio() {
      return this.health / this.maxHealth;
   }

   /**
    * Size ratio.
    * Altered with Math.ceil because of floating numbers.
    * @returns boolean
    */
   sizeRatio() {
      return Math.ceil((this.h / this.originalSize) * 10) / 10;
   }

   /**
    * => see {@link SmallChicken.canSpawnCoinOnDeath()}
    * @returns - just "return"s to prevent a coin spawn from BossChicken.
    */
   canSpawnCoinOnDeath() {
      return;
   }

   /**
    * => see {@link MovableObject.invulnaribility()}
    * @returns invulnerability while resizing
    */
   invulnerability() {
      return this.resizingState;
   }

   /**
    * Triggers other functions if the boss is defeated.
    */
   bossDefeated() {
      disableKeysAfterBossIsDown();
      this.resizingAmount = this.resizingAmount * 1.5;
      this.world.character.endCharacterIntervals();
   }
}

class BigChicken extends MediumChicken {
   data = bigChickenClassData;
   maxHealth = this.data['maxHealth'];
   resizingAmount = this.data['resizingAmount'];
   originalSize;
   world;
   hasSeenTheCharacter = false;

   resizePointY;
   resizingState;

   resizeInterval = setInterval(() => {
      let ratio = this.w / this.h;
      if (this.healthRatio() < this.sizeRatio()) {
         this.resizingState = true;
         this.h -= (1 / this.resizingAmount) * canvasHeight;
         this.adjustParameterToOwnHeight(ratio);
      } else if (this.sizeRatio() < 0) {
         clearInterval(this.resizeInterval);
      } else if (this.healthRatio() > this.sizeRatio() && this.healthRatio() != this.sizeRatio()) {
         this.h = this.originalSize * this.healthRatio();
         this.adjustParameterToOwnHeight(ratio);
         this.resizePointY -= this.h * 0.0125;
         this.resizingState = false;
         this.refreshSpeedAfterResize();
      }
   }, msPerCheck);

   stateCheckInterval = setInterval(() => {
      if (this.isInsideCanvas(this.x) && !this.hasSeenTheCharacter) {
         this.world.playAudio(BOSS_BGM_AUDIO);
         this.hasSeenTheCharacter = true;
         this.world.silenceBGM(BGM_AUDIO);
      } else if (this.health == 0 && !this.resizingState) {
         this.bossDefeated();
      }
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

   left() {
      if (!this.resizingState) {
         if (this.isInsideCanvas(this.x) || this.hasSeenTheCharacter) {
            this.refreshSpeed();
            this.moveLeft();
         } else if (this.isOutsideCanvas(this.spawnX)) {
            this.x = this.spawnX;
            BOSS_BGM_AUDIO.object.pause();
         }
      }
   }

   adjustParameterToOwnHeight(ratio) {
      let oldWidth = this.w;
      this.w = ratio * this.h;
      this.x = this.x + 0.5 * (oldWidth - this.w);
      this.y = this.resizePointY - this.h;
      this.spawnY = this.y;
   }

   refreshSpeedAfterResize() {
      this.speedX_rel = this.speedX_rel * 1.75;
      this.refreshSpeed();
   }

   jump() {
      if (!this.resizingState) {
         super.jump();
      }
   }

   defineResizeOrigins(y, h) {
      this.resizePointY = y + 0.975 * h;
      this.originalSize = h;
      this.resizingState = false;
   }

   healthRatio() {
      return this.health / this.maxHealth;
   }

   sizeRatio() {
      return this.h / this.originalSize;
   }

   spawnCoinOnDeath() {
      return;
   }

   invulnerability() {
      return this.resizingState;
   }

   bossDefeated() {
      let char = this.world.character;
      disableKeys();
      LEFT_disabled = true;
      RIGHT_disabled = true;
      JUMP_disabled = true;
      THROW_disabled = true;
      this.resizingAmount = this.resizingAmount * 2;
      char.isCharacterDead(true);
      char.endInterval(char.movementInterval);
      char.endInterval(char.animationInterval);
      char.endInterval(char.jumpInterval);
   }
}

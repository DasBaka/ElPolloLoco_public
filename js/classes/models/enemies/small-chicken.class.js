class SmallChicken extends JumpableObject {
   data = smallChickenClassData;

   savePosition = 0;
   world;

   adjustSpawnInterval = setInterval(() => {
      if (LEFT && !LEFT_disabled && this.world.character.health != 0) {
         this.spawnX -= this.world.groundMaxSpeed;
      }
      if (RIGHT && !RIGHT_disabled && this.world.character.health != 0) {
         this.spawnX += this.world.groundMaxSpeed;
      }
   }, msPerCheck);

   constructor(spawn) {
      super().fetchData();
      this.loadImage(this.path);
      this.prepareImage();
      this.letSpawn(spawn);
      this.loadAnimations();
   }

   fetchData() {
      super.fetchData();
      this.speedX_rel = this.speedX_rel * this.data['enemySpeedConst'];
   }

   left() {
      if (this.isInsideCanvas(this.x)) {
         this.speedAdjustment();
         this.moveLeft();
      } else if (this.isOutsideCanvas(this.spawnX)) {
         this.x = this.spawnX;
      }
   }

   speedAdjustment() {
      this.refreshSpeed();
      if (this.pauseInterval) {
         this.syncToCharHit();
      } else {
         this.syncToCharMovement();
      }
   }

   syncToCharMovement() {
      if (this.world?.character.validateLeft()) {
         this.speedX += this.world.groundMaxSpeed;
      }
      if (this.world?.character.validateRight()) {
         this.speedX -= this.world.groundMaxSpeed;
      }
   }

   syncToCharHit() {
      if (this.world?.character.validateLeft()) {
         this.speedX = this.world.groundMaxSpeed * 1.5;
      }
      if (this.world?.character.validateRight()) {
         this.speedX = -this.world.groundMaxSpeed * 1.5;
      }
   }

   isWalking() {
      return true;
   }

   invulnerability() {
      return !this.timePassed(this.lastHit, invulnerabilityFrames / 5);
   }

   spawnCoinOnDeath() {
      let random = Math.floor(Math.random() * randomBaseForCoin);
      if (random <= randomChanceForCoin) {
         let x = this.x / canvasWidth;
         let y = this.y / canvasHeight;
         this.world.spawnCoin(x, y);
      }
   }

   isHit() {
      this.world.playAudio(CHICKEN_CRY_AUDIO);
      super.isHit();
   }

   noHealth() {
      if (this.health == 0) {
         this.world.playAudio(CHICKEN_DEFEAT_AUDIO);
         super.noHealth();
      }
   }
}

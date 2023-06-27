class SmallChicken extends JumpableObject {
   data = smallChickenClassData;

   savePosition = 0;
   world;

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
      if (this.validateLeft()) {
         this.refreshSpeed();
         if (this.pauseInterval) {
            this.speedX = 0;
         }
         this.changeDirection();
         this.moveLeft();
      } else if (this.isOutsideCanvas(this.spawnX)) {
         this.stayAtSpawn();
      }
   }

   stayAtSpawn() {
      this.x = this.spawnX;
   }

   validateLeft() {
      return this.isInsideCanvas(this.x);
   }

   changeDirection() {
      return;
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

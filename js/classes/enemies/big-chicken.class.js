class BigChicken extends MediumChicken {
   data = bigChickenClassData;
   maxHealth = this.data['maxHealth'];
   originalSize;
   world;

   resizePointY;
   resizingState;

   resizeInterval = setInterval(() => {
      let ratio = this.w / this.h;
      if (this.healthRatio() < this.sizeRatio()) {
         this.resizingState = true;
         this.h -= (1 / 250) * canvasHeight;
         this.adjustParameterToOwnHeight(ratio);
      } else if (this.healthRatio() > this.sizeRatio() && this.healthRatio() != this.sizeRatio()) {
         this.h = this.originalSize * this.healthRatio();
         this.adjustParameterToOwnHeight(ratio);
         this.resizePointY -= this.h * 0.0125;
         this.resizingState = false;
      }
   }, msPerCheck);

   constructor(spawn) {
      super().fetchData();
      this.loadImage(this.path);
      this.prepareImage();
      this.y += 0.05 * canvasHeight;
      this.defineResizeOrigins(this.y, this.h);
      this.letSpawn(spawn);
      this.loadAnimations();
   }

   adjustParameterToOwnHeight(ratio) {
      this.w = ratio * this.h;
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
}

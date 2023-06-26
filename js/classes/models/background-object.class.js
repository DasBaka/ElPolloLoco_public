class BackgroundObject extends MovableObject {
   data = backgroundObjectsData;

   world;

   constructor(path, x, speed) {
      super().fetchData();
      this.loadImage(path);
      // Recalculates the speed of the background object to create a parallax effect.
      // Note: This results in a negative speed to move with the Character in opposing directions!
      this.speedX_rel = (pepeSpeed / 10) * (1 - Math.pow(bgBaseSpeed, speed + 0.5));
      this.x_rel = x * this.w_rel;
      this.prepareImage();
      this.refreshSpeed();
      this.bgFix();
   }

   /**
    * Because of some size differences, this function fixes some empty pixels.
    */
   bgFix() {
      this.w = this.w + 1;
      this.x = this.x + 1;
      this.y = 0;
      this.spawnY = 0;
   }

   /**
    * Left moving.
    * Alternately: Stops movement at the beginning of the level.
    */
   left() {
      if (this.validateLeft()) {
         this.refreshSpeed();
         this.moveLeft();
      } else if (this.x > this.spawnX) {
         this.x = this.spawnX;
      }
   }

   /**
    * Right movement.
    */
   right() {
      if (this.validateRight()) {
         this.refreshSpeed();
         this.moveRight();
      }
   }

   fasterIfHit() {
      if (this.world?.character.invulnerability()) {
         return this.speedX_rel * 1.5;
      } else {
         return this.speedX_rel;
      }
   }
}

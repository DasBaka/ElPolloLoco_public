class BackgroundObject extends MovableObject {
   data = backgroundObjectsData;

   world;

   constructor(path, x, speed) {
      super().fetchData();
      this.loadImage(path);
      this.speedX_rel =
         (pepeSpeed / 10) * (1 - Math.pow(bgBaseSpeed, speed + 0.5));
      this.x_rel = x * this.w_rel;
      this.prepareImage();
      this.refreshSpeed();
      this.bgFix();
   }

   bgFix() {
      this.w = this.w + 1;
      this.x = this.x + 1;
      this.y = 0;
      this.spawnY = 0;
   }

   left() {
      if (this.validateLeft()) {
         this.moveLeft();
      } else if (this.x > this.spawnX) {
         this.x = this.spawnX;
      }
   }

   right() {
      if (this.validateRight()) {
         this.moveRight();
      }
   }

   validateLeft() {
      return (
         LEFT &&
         !LEFT_disabled &&
         this.x < this.spawnX &&
         this.world.character.health != 0
      );
   }

   validateRight() {
      return RIGHT && !RIGHT_disabled && this.world.character.health != 0;
   }
}

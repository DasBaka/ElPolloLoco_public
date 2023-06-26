class Coin extends AnimatableObject {
   data = coinObjectData;
   world;

   constructor(x, y) {
      super().fetchData();
      this.loadImage(this.path);
      this.prepareImage();
      this.y = y * canvasHeight;
      this.letSpawn(x);
      this.loadAnimations();
   }

   left() {
      if (LEFT && !LEFT_disabled && this.world.character.health != 0) {
         this.refreshSpeed();
         this.moveLeft();
      }
   }

   right() {
      if (RIGHT && !RIGHT_disabled && this.world.character.health != 0) {
         this.refreshSpeed();
         this.moveRight();
      }
   }

   refreshSpeed() {
      let speed = groundMaxSpd * this.fasterIfHit();
      this.speedX = speed;
   }

   fasterIfHit() {
      if (this.world?.character.invulnerability()) {
         return 1.5;
      } else {
         return 1;
      }
   }
}

class Coin extends AnimatableObject {
   data = coinObjectData;
   world;

   constructor(x, y) {
      super().fetchData();
      this.loadImage(this.path);
      this.prepareImage();
      this.y = y * canvasHeight;
      this.speedX_rel = groundMaxSpdRel;
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

   fasterIfHit() {
      if (this.world?.character.invulnerability()) {
         return this.speedX_rel * 1.5;
      } else {
         return this.speedX_rel;
      }
   }
}

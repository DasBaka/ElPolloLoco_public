class Tabasco extends MovableObject {
   data = tabascoObjectData;
   world;

   constructor(x) {
      super().fetchData();
      this.loadImage(this.path);
      this.speedX_rel = groundMaxSpdRel;
      this.prepareImage();
      this.letSpawn(x);
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

class Tabasco extends MovableObject {
   data = tabascoObjectData;
   world;

   constructor(x) {
      super().fetchData();
      this.loadImage(this.path);
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

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
         this.speedX = this.world.groundMaxSpeed;
         this.moveLeft();
      }
   }

   right() {
      if (RIGHT && !RIGHT_disabled && this.world.character.health != 0) {
         this.speedX = this.world.groundMaxSpeed;
         this.moveRight();
      }
   }
}

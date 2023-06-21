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

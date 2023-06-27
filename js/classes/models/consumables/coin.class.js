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
}

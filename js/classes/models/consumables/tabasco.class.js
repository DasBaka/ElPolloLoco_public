class Tabasco extends MovableObject {
   data = tabascoObjectData;
   world;

   constructor(x) {
      super().fetchData();
      this.loadImage(this.path);
      this.prepareImage();
      this.letSpawn(x);
   }
}

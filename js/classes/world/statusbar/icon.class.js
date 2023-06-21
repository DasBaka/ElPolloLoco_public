class Icon extends DrawableObject {
   data = iconClassData;

   constructor(activeImg, num, line, xOffset) {
      super().fetchData();
      this.renderIcon(activeImg, num, line, xOffset);
   }

   renderIcon(img, num, yOffset, xOffset) {
      this.loadImage(img);
      this.prepareImage();
      this.y = -0.15 * this.h + 0.05 * this.h * yOffset;
      this.x = 0.8 * this.w * num + this.w * xOffset * 0.57;
      this.setSpawn();
   }
}

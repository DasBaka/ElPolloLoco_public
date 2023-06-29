class Icon extends DrawableObject {
   data = iconClassData;

   constructor(activeImg, num, line, xOffset) {
      super().fetchData();
      this.renderIcon(activeImg, num, line, xOffset);
   }

   /**
    * Renders the img or adjust the parameters respectively.
    * @param {imgUrl} img - img data
    * @param {num} num - nth img
    * @param {num} yOffset - offset y
    * @param {num} xOffset - offset x
    */
   renderIcon(img, num, yOffset, xOffset) {
      this.loadImage(img);
      this.prepareImage();
      this.y = -0.15 * this.h + 0.05 * this.h * yOffset;
      this.x = 0.8 * this.w * num + this.w * xOffset * 0.57;
      this.setSpawn();
   }
}

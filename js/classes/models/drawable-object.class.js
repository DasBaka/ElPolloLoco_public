class DrawableObject {
   data = drawableObjectData;
   x_rel;
   w_rel;
   h_rel;
   x;
   y;
   w;
   h;
   leftOffset;
   rightOffset;
   bottomOffset;
   topOffset;

   img;
   imgCache = {};
   path;
   currentImg = 0;
   otherDirection = false;

   spawnX;
   spawnY;

   checkInterval;

   constructor() {
      this.fetchData();
   }

   /**
    * Fetches data from the corresponding json-variable.
    */
   fetchData() {
      this.x_rel = this.data['x_rel'];
      this.w_rel = this.data['w_rel'];
      this.h_rel = this.data['h_rel'];
      this.path = this.data['path'];
      this.leftOffset = this.data['leftOffset'];
      this.rightOffset = this.data['rightOffset'];
      this.bottomOffset = this.data['bottomOffset'];
      this.topOffset = this.data['topOffset'];
   }

   /**
    * Prepares the image to get drawn.
    */
   prepareImage() {
      this.scaleImage();
      this.setSpawn();
      this.refreshSpeed();
   }

   /**
    * Sets the spawn origins of the drawn object.
    */
   setSpawn() {
      this.spawnX = this.x;
      this.spawnY = this.y;
   }

   /**
    * => see: {@link MovableObject.refreshSpeed()}
    */
   refreshSpeed() {}

   /**
    * Sets a specific x-spawn origin based on a number.
    * @param {num} location - number to determine location (based on canvasWidth)
    */
   letSpawn(location) {
      this.x = Math.floor(location * canvasWidth) - pepeSpeed * canvasWidth;
      this.setSpawn();
   }

   /**
    * Scales the object based on the canvas scaling.
    */
   scaleImage() {
      this.w = Math.floor(canvasWidth * this.w_rel);
      this.h = Math.floor(canvasHeight * this.h_rel);
      this.x = Math.floor(canvasWidth * this.x_rel);
      this.y = Math.floor(groundLevel - this.h);
   }

   /**
    * Creates a new Image class with the path as source.
    * @param {url} path - relative path to the image
    */
   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }

   /**
    * Loads several images (mostly for animation purposes) and puts them into a cache.
    * @param {array} arr - (animation-)array with images(paths)
    */
   loadImages(arr) {
      arr.forEach((path) => {
         if (path == 'stop') {
            return;
         }
         let img = new Image();
         img.src = path;
         this.imgCache[path] = img;
      });
   }

   /**
    * Logic: Can you see or nearly see the object inside the canvas?
    * @param {object} x - object, whose location should be checked
    * @returns - boolean
    */
   isInsideCanvas(x) {
      return this.isNotOutsideLeft(x) && this.isNotOutsideRight(x);
   }

   /**
    * Logic: Can you NOT see or is the object "outside enough" of the canvas?
    * @param {object} x - object, whose location should be checked
    * @returns - boolean
    */
   isOutsideCanvas(x) {
      return !this.isNotOutsideLeft(x) || !this.isNotOutsideRight(x);
   }

   /**
    * Logic: From left -> Is the object still inside the canvas (incl threshhold)?
    * @param {object} x - object, whose location should be checked
    * @returns - boolean
    */
   isNotOutsideLeft(x) {
      return x + this.w >= this.world?.character.x - canvasWidth * spawnCoeff;
   }

   /**
    * Logic: From right -> Is the object still inside the canvas (incl threshhold)?
    * @param {object} x - object, whose location should be checked
    * @returns - boolean
    */
   isNotOutsideRight(x) {
      return x - this.w <= this.world?.character.x + canvasWidth * spawnCoeff;
   }

   /**
    * Counts for: {@link rightSide(obj)}, {@link leftSide(obj)}, {@link topSide(obj)}, {@link bottomSide(obj)}:
    * Defines the hitboxes borders of the object.
    * @param {object} obj - object
    * @returns - border coordinates
    */
   rightSide(obj) {
      return obj.x + obj.w * obj.rightOffset;
   }
   leftSide(obj) {
      return obj.x + obj.w * obj.leftOffset;
   }
   topSide(obj) {
      return obj.y + obj.h * obj.topOffset;
   }
   bottomSide(obj) {
      return obj.y + obj.h * obj.bottomOffset;
   }

   /**
    * Ends an interval.
    * @param {interval} fn - interval
    */
   endInterval(fn) {
      clearInterval(fn);
   }
}

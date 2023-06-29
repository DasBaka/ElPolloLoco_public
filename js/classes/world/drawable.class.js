class Drawable {
   ctx;
   canvas;

   constructor() {
      this.defineCanvasProperties();
   }

   /**
    * Creates the context of the canvas and redefines its size based on the user resolution.
    */
   defineCanvasProperties() {
      this.canvas = document.getElementById('canvas');
      this.ctx = canvas.getContext('2d');
      this.ctx;

      //predefine the canvas size based on the window
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
   }

   /**
    * Main method called on {@link World}-creation to draw on the canvas.
    */
   draw() {
      this.prepareCanvas();
      let self = this;
      requestAnimationFrame(() => {
         self.draw();
      });
   }

   /**
    * Prepares and translate the canvas before requesting the animation frame.
    */
   prepareCanvas() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.translate(this.cameraX, 0);
      this.drawMovableObjects();
      this.ctx.translate(-this.cameraX, 0);
      this.drawStaticObjects();
   }

   /**
    * Triggers a function for each relevant Object / Object Array to get drawn on the canvas.
    */
   drawMovableObjects() {
      this.addObjectsToMap(this.backgroundObjects);
      this.addTextObjectsToMap(this.textObjects);
      this.addObjectsToMap(this.throwable);
      this.addObjectsToMap(this.enemies);
      this.addObjectsToMap(this.coins);
      this.addObjectsToMap(this.bottles);
      this.addToMap(this.character);
   }

   /**
    * Triggers a function for each relevant static Object / static Object Array to get drawn on the canvas.
    */
   drawStaticObjects() {
      let stats = this.statusbar;
      this.addObjectsToMap(stats.hearts);
      this.addObjectsToMap(stats.coin);
      this.addObjectsToMap(stats.bottle);
      this.addTextToMap(stats.coinText, stats.coinTextX, stats.coinTextY);
      stats.max.forEach((max) => {
         this.addTextToMap('MAX', max['x'], max['y']);
      });
   }

   /**
    * Main method to get an object drawn on the canvas.
    * @param {object} obj - object
    */
   addToMap(obj) {
      if (obj.otherDirection) {
         this.flipImage(obj);
      }
      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h);
      /*       this.showHitBox(obj); */ //only for visual collision detection
      if (obj.otherDirection) {
         this.flipImageBack(obj);
      }
   }

   /**
    * Method to get several text-objects drawn on the canvas.
    * @param {array} arr - text-object array
    */
   addTextObjectsToMap(arr) {
      arr.forEach((txtObj) => {
         for (let i = 0; i < txtObj.text.length; i++) {
            let fs = txtObj.size * this.getFontSize();
            let y = maxTextHeight * canvasHeight + fs * i;
            this.ctx.font = fs + 'px Boogaloo';
            this.addTextToMap(txtObj.text[i], txtObj.x, y, fs);
         }
      });
   }

   /**
    * Main method to get a text-object drawn on the canvas.
    * @param {string} text - text
    * @param {x} x - x-coord
    * @param {y} y - y-corrd
    * @param {num} lineWidth - height of the text line
    */
   addTextToMap(text, x, y, lineWidth) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fillText(text, x, y);
      if (this.canvas.width > 650 && this.canvas.height > 400) {
         this.ctx.strokeStyle = strokeColor;
         this.ctx.lineWidth = lineWidth * 0.02;
         this.ctx.strokeText(text, x, y);
      }
   }

   /**
    * Reads the font size of the decoment.
    * @returns num / font size
    */
   getFontSize() {
      let bd = document.body;
      return Number(window.getComputedStyle(bd, '').getPropertyValue('font-size').match(/\d+/)[0]);
   }

   /**
    * JUST FOR DEBUGGING!
    * Shows a border araound objects.
    * @param {object} obj - object
    */
   showHitBox(obj) {
      this.ctx.beginPath();
      this.ctx.lineWidth = '2';
      this.ctx.strokeStyle = 'blue';
      this.ctx.rect(
         obj.x + obj.w * obj.leftOffset,
         obj.y + obj.topOffset * obj.h,
         obj.w * (obj.rightOffset - obj.leftOffset),
         obj.h * (obj.bottomOffset - obj.topOffset)
      );
      this.ctx.stroke();
   }

   /**
    * Prepares an object to get x-mirrored.
    * @param {object} obj - object
    */
   flipImage(obj) {
      this.ctx.save();
      this.ctx.translate(obj.w, 0);
      this.ctx.scale(-1, 1);
      obj.x = obj.x * -1;
   }

   /**
    * Restores the context after flipping an object (see {@link flipImage()}).
    * @param {object} obj - object
    */
   flipImageBack(obj) {
      obj.x = obj.x * -1;
      this.ctx.restore();
   }

   /**
    * Parent function of {@link addToMap()}.
    * @param {array} objects - object array
    */
   addObjectsToMap(objects) {
      objects.forEach((o) => {
         this.addToMap(o);
      });
   }
}

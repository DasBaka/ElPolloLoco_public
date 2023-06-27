class Drawable {
   ctx;
   canvas;

   constructor() {
      this.defineCanvasProperties();
   }

   defineCanvasProperties() {
      this.canvas = document.getElementById('canvas');
      this.ctx = canvas.getContext('2d');
      this.ctx;

      //predefine the canvas size based on the window
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
   }

   draw() {
      this.prepareCanvas();

      let self = this;
      requestAnimationFrame(() => {
         self.draw();
      });
   }

   prepareCanvas() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.translate(this.cameraX, 0);
      this.drawMovableObjects();
      this.ctx.translate(-this.cameraX, 0);
      this.drawStaticObjects();
   }

   drawMovableObjects() {
      this.addObjectsToMap(this.backgroundObjects);
      this.addTextObjectsToMap(this.textObjects);
      this.addObjectsToMap(this.throwable);
      this.addObjectsToMap(this.enemies);
      this.addObjectsToMap(this.coins);
      this.addObjectsToMap(this.bottles);
      this.addToMap(this.character);
   }

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

   addToMap(obj) {
      if (obj.otherDirection) {
         this.flipImage(obj);
      }

      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h);

      /*       this.showHitBox(obj); */

      if (obj.otherDirection) {
         this.flipImageBack(obj);
      }
   }

   addTextObjectsToMap(arr) {
      arr.forEach((txtObj) => {
         for (let i = 0; i < txtObj.text.length; i++) {
            let fs = txtObj.size * this.getFontSize();
            let y = maxTextHeight * canvasHeight + fs * i;
            this.ctx.font = fs + 'px Boogaloo';
            this.addTextToMap(txtObj.text[i], txtObj.x, y);
         }
      });
   }

   addTextToMap(text, x, y) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fillText(text, x, y);
      if (this.canvas.width > 650 && this.canvas.height > 400) {
         this.ctx.strokeStyle = strokeColor;
         this.ctx.strokeText(text, x, y);
      }
   }

   getFontSize() {
      let bd = document.body;
      return Number(window.getComputedStyle(bd, '').getPropertyValue('font-size').match(/\d+/)[0]);
   }

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

   flipImage(obj) {
      this.ctx.save();
      this.ctx.translate(obj.w, 0);
      this.ctx.scale(-1, 1);
      obj.x = obj.x * -1;
   }

   flipImageBack(obj) {
      obj.x = obj.x * -1;
      this.ctx.restore();
   }

   addObjectsToMap(objects) {
      objects.forEach((o) => {
         this.addToMap(o);
      });
   }
}

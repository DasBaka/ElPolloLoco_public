class TextObject extends MovableObject {
   text = [];
   size;
   world;

   constructor(textArr, x) {
      super();
      this.letSpawn(x);
      this.convertText(textArr);
      this.size = textArr.size;
   }

   /**
    * If the text-string of the text-array has a line break (<br>) in it, this function breaks the string into seperate objects, which will then be handled with line breaks while drawing the canvas.
    * @param {arr} arr -  text data
    */
   convertText(arr) {
      let string = arr.text;
      let array = string.split('<br>');
      array.forEach((e) => {
         this.text.push(e);
      });
   }

   /**
    * Left moving.
    * Alternately: Stops movement at the beginning of the level.
    */
   left() {
      if (this.validateLeft()) {
         this.speedX = this.world.groundMaxSpeed;
         this.moveLeft();
      } else if (this.x > this.spawnX) {
         this.x = this.spawnX;
      }
   }

   /**
    * Right movement.
    */
   right() {
      if (this.validateRight()) {
         this.speedX = this.world.groundMaxSpeed;
         this.moveRight();
      }
   }
}

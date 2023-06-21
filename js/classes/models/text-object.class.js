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

   convertText(arr) {
      let string = arr.text;
      let array = string.split('<br>');
      array.forEach((e) => {
         this.text.push(e);
      });
   }

   left() {
      if (this.validateLeft()) {
         this.speedX = this.world.groundMaxSpeed;
         this.moveLeft();
      } else if (this.x > this.spawnX) {
         this.x = this.spawnX;
      }
   }

   right() {
      if (this.validateRight()) {
         this.speedX = this.world.groundMaxSpeed;
         this.moveRight();
      }
   }

   validateLeft() {
      return (
         LEFT &&
         !LEFT_disabled &&
         this.x < this.spawnX &&
         this.world.character.health != 0
      );
   }

   validateRight() {
      return RIGHT && !RIGHT_disabled && this.world.character.health != 0;
   }
}

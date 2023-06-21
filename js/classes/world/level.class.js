class Level {
   enemies;
   coins;
   bottles;
   backgroundObjects;
   levelEnd;

   textObjects = [];

   constructor(enemies, coins, bottles, levelLength, textObj) {
      this.enemies = enemies;
      this.coins = coins;
      this.bottles = bottles;
      this.backgroundObjects = this.levelLength(levelLength);
      this.levelEnd = canvasWidth * 2 * levelLength;
      this.pushObjects(textObj, this.textObjects);
   }

   levelLength(num) {
      let array = [];
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < num; j++) {
            array.push(new BackgroundObject(backgroundLayers[i], j, i));
         }
      }
      return array;
   }

   pushObjects(originArr, targetArr) {
      originArr.forEach((o) => {
         targetArr.push(o);
      });
   }
}

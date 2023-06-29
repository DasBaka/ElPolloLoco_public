class Level {
   enemies = [];
   coins = [];
   bottles = [];
   backgroundObjects = [];
   levelEnd;

   textObjects = [];

   constructor(level) {
      this.forEachEnemyData(level.enemies);
      this.forEachCoinData(level.coins);
      this.forEachBottleData(level.bottles);
      this.forEachBGData(level.levelLength);
      this.levelEnd = canvasWidth * 2 * level.levelLength;
      this.forEachTextData(level.text);
   }

   /**
    * Creates a new "enemies" class object, for each object in level.enemies.
    * @param {array} enemies - object array
    */
   forEachEnemyData(enemies) {
      for (let i = 0; i < enemies.length; i++) {
         let x = enemies[i][1];
         switch (enemies[i][0]) {
            case 'SmallChicken':
               this.enemies.push(new SmallChicken(x));
               break;
            case 'MediumChicken':
               this.enemies.push(new MediumChicken(x));
               break;
            case 'BigChicken':
               this.enemies.push(new BigChicken(x));
               break;
         }
      }
   }

   /**
    * Creates a new {@link Coin()} Class object for each object in level.coins
    * @param {array} coins - object array
    */
   forEachCoinData(coins) {
      for (let i = 0; i < coins.length; i++) {
         this.coins.push(new Coin(coins[i][0], coins[i][1]));
      }
   }

   /**
    * Creates a new {@link Tabasco()} class object for each number in level.bottles
    * @param {num} x - future x-coord of the tabasco bottle
    */
   forEachBottleData(x) {
      for (let i = 0; i < x.length; i++) {
         this.bottles.push(new Tabasco(x[i]));
      }
   }

   /**
    * Creates a new {@link BackgroundObject} class object corresponding to the length of the level.
    * @param {num} length - level length
    */
   forEachBGData(length) {
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < length; j++) {
            this.backgroundObjects.push(new BackgroundObject(backgroundLayers[i], j, i));
         }
      }
   }

   /**
    * Creates an new {@link TextObject()} class object for each object in level.text.
    * @param {array} text - object array
    */
   forEachTextData(text) {
      for (let i = 0; i < text.length; i++) {
         this.textObjects.push(new TextObject(text[i][0], text[i][1]));
      }
   }
}

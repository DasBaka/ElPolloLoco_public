class NonEnemyCollision {
   world;
   knockback = new Knockback();

   /**
    * Checks for non-enemy collisions involving the character.
    */
   nonEnemyCollisionInterval = setInterval(() => {
      this.charAndCoinCollision();
      this.charAndBottleCollision();
   }, msPerCheck);

   constructor(world) {
      this.world = world;
   }

   /**
    * Initializes the collision detection with a coin for each coin.
    */
   charAndCoinCollision() {
      this.world.coins.forEach((coin, index, arr) => {
         this.charCollidesWithCoin(coin, index, arr);
      });
   }

   /**
    * Initializes the collision detection with a tabasco bottle for each bottle.
    */
   charAndBottleCollision() {
      this.world.bottles.forEach((bottle, index, arr) => {
         this.charCollidesWithBottle(bottle, index, arr);
      });
   }

   /**
    * Checks for positive collision with a coin.
    * @param {object} coin - current coin object
    * @param {index} index - index of the coin object
    * @param {array} arr - coins array
    */
   charCollidesWithCoin(coin, index, arr) {
      let char = this.world.character;
      let stats = this.world.statusbar;
      if (char.isColliding(coin)) {
         stats.updateCoinValue(arr, index);
         if (this.isNotFullHealth(stats, char)) {
            this.world.statusbar.healCharacter(char, stats);
         } else {
            this.world.audio.playAudio(COIN_GRAB_AUDIO);
         }
      }
   }

   /**
    * Logic for coin collection type (normal / heal)
    * @param {num} stats - coin amount
    * @param {object} char - character object
    * @returns boolean
    */
   isNotFullHealth(stats, char) {
      return stats.currentCoinAmount >= 10 && char.health < stats.maxHealth;
   }

   /**
    * Checks for positive collection with a tabasco bottle on the ground.
    * @param {object} bottle - current throwable object
    * @param {index} index - index of the throwable object
    * @param {array} arr - throwable array
    * @returns
    */
   charCollidesWithBottle(bottle, index, arr) {
      let char = this.world.character;
      let stats = this.world.statusbar;
      if (char.isColliding(bottle)) {
         if (stats.bottleAmount == stats.maxBottle) {
            return;
         } else {
            this.world.audio.playAudio(COLLECT_BOTTLE_AUDIO);
            stats.updateBottleValue(arr, index);
         }
      }
   }
}

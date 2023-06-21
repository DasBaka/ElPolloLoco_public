class NonEnemyCollision {
   world;
   knockback = new Knockback();

   nonEnemyCollisionInterval = setInterval(() => {
      this.charAndCoinCollision();
      this.charAndBottleCollision();
   }, msPerCheck);

   constructor(world) {
      this.world = world;
   }

   charAndCoinCollision() {
      this.world.coins.forEach((coin, index, arr) => {
         this.charCollidesWithCoin(coin, index, arr);
      });
   }
   charAndBottleCollision() {
      this.world.bottles.forEach((bottle, index, arr) => {
         this.charCollidesWithBottle(bottle, index, arr);
      });
   }

   charCollidesWithCoin(coin, index, arr) {
      let char = this.world.character;
      let stats = this.world.statusbar;
      if (char.isColliding(coin)) {
         if (this.isNotFullHealth(stats, char)) {
            stats.updateCoinValue(arr, index);
            char.health += 1;
         } else if (this.canCollectCoins(stats, char)) {
            stats.updateCoinValue(arr, index);
         }
      }
   }

   isNotFullHealth(stats, char) {
      return stats.currentCoinAmount == 9 && char.health < stats.maxHealth;
   }

   canCollectCoins(stats, char) {
      return !char.invulnerability() && stats.currentCoinAmount != 9;
   }

   charCollidesWithBottle(bottle, index, arr) {
      let char = this.world.character;
      let stats = this.world.statusbar;
      if (char.isColliding(bottle)) {
         if (stats.bottleAmount == stats.maxBottle) {
            return;
         } else {
            stats.updateBottleValue(arr, index);
         }
      }
   }
}

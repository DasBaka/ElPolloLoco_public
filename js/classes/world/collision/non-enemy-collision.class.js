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
         stats.updateCoinValue(arr, index);
         if (this.isNotFullHealth(stats, char)) {
            this.healCharacter(char, stats);
         } else {
            this.world.audio.playAudio(COIN_GRAB_AUDIO);
         }
      }
   }

   healCharacter(char, stats) {
      this.world.audio.playAudio(GET_HEALTH_AUDIO);
      stats.currentCoinAmount -= 10;
      char.health += 1;
   }

   isNotFullHealth(stats, char) {
      return stats.currentCoinAmount >= 10 && char.health < stats.maxHealth;
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
            this.world.audio.playAudio(COLLECT_BOTTLE_AUDIO);
            stats.updateBottleValue(arr, index);
         }
      }
   }
}

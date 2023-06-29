class World extends Drawable {
   // properties connected to world
   enemyCollison;
   nonEnemyCollision;
   knockback;
   audio;

   level;
   character;
   statusbar;
   enemies;
   backgroundObjects;
   throwable = [];
   coins;
   bottles;
   textObjects;

   // camera movement
   cameraX;
   levelEnd;

   bottleInterval = setInterval(() => {
      if (THROW && !THROW_disabled && !KEYS_disabled && this.statusbar.bottleAmount > 0) {
         this.statusbar.bottleAmount -= 1;
         THROW_disabled = true;
         this.throwable.push(new ThrowableObject(this));
         this.throwable[this.throwable.length - 1].world = this;
         this.playAudio(THROW_BOTTLE_AUDIO);
         this.bottleCooldown();
      }
   }, msPerCheck);

   constructor(level) {
      super();
      this.level = new Level(level);
      this.audio = new WorldAudio();
      this.createBaseWorld(this.level);
      this.generateWorld();
      this.setWorldForAll(this.baseWorld());
      this.resetSpawns();
      this.draw();
      this.playAudio(BGM_AUDIO);
   }

   createBaseWorld(level) {
      this.enemies = this.pushLevelData(level.enemies);
      this.backgroundObjects = this.pushLevelData(level.backgroundObjects);
      this.coins = this.pushLevelData(level.coins);
      this.bottles = this.pushLevelData(level.bottles);
      this.textObjects = this.pushLevelData(level.textObjects);
      this.levelEnd = level.levelEnd;
      this.cameraX = 0;
   }

   pushLevelData(data) {
      let array = [];
      for (let i = 0; i < data.length; i++) {
         array.push(data[i]);
      }
      return array;
   }

   generateWorld() {
      this.character = new Character(this);
      this.statusbar = new Statusbar(this);
      this.enemyCollison = new EnemyCollision(this);
      this.nonEnemyCollision = new NonEnemyCollision(this);
      this.knockback = new Knockback(this);
   }

   setWorldForAll(arr) {
      arr.forEach((el) => this.setWorldForEach(el));
   }

   setWorldForEach(objArr) {
      objArr.forEach((e) => {
         e.world = this;
      });
   }

   bottleCooldown() {
      setTimeout(() => {
         THROW_disabled = false;
      }, bottleCD);
   }

   spawnCoin(x, y) {
      setTimeout(() => {
         this.coins.push(new Coin(x, y));
         this.coins[this.coins.length - 1].world = this;
      }, msPerFrame * 1.5);
   }

   respawnBottle(bottle) {
      setTimeout(() => {
         bottle.y = groundLevel - bottle.h;
      }, respawnBottleCD);
   }

   pauseInterval(obj, state) {
      obj.forEach((o) => {
         o.pauseInterval = state;
      });
   }

   clearAllIntervals() {
      let maxIntervalCount = setInterval(() => ';');
      for (let i = 0; i < maxIntervalCount + 1; i++) {
         clearInterval(i);
      }
   }

   baseWorld() {
      return [this.enemies, this.backgroundObjects, this.coins, this.bottles, this.textObjects];
   }

   insideWorld() {
      return [...this.baseWorld(), this.character, this.throwable, this.statusbar];
   }

   resetSpawns() {
      this.insideWorld().forEach((el) => {
         if (el.length == undefined) {
            el.x = el.spawnX;
         } else {
            el.forEach((e) => (e.x = e.spawnX));
         }
      });
   }

   characterIsDead(bossDown) {
      this.enemies.forEach((enemy) => {
         this.endEnemyIntervalOnEnd(enemy);
      });
      showEndModal(bossDown);
      this.endEnemyIntervalOnEnd();
      this.audio.prepareAudioForModal(bossDown);
   }

   endIntervalsOnEnd() {
      setTimeout(() => {
         this.clearAllIntervals();
         this.audio.silenceAllBGM(); // <= needs to be revoked to play ending audio!!
      }, 1500);
   }

   endEnemyIntervalOnEnd(enemy) {
      enemy.endInterval(enemy.movementInterval);
      if (!enemy instanceof BigChicken) {
         enemy.endInterval(enemy.animationInterval);
      }
      enemy.endInterval(enemy.jumpInterval);
   }
}

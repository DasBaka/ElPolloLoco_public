class World extends Drawable {
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

   cameraX;
   levelEnd;

   /**
    * Interval for checking throwables.
    */
   bottleInterval = setInterval(() => {
      if (THROW && !THROW_disabled && !KEYS_disabled && this.statusbar.bottleAmount > 0) {
         this.statusbar.bottleAmount -= 1;
         THROW_disabled = true;
         this.throwable.push(new ThrowableObject(this));
         this.throwable[this.throwable.length - 1].world = this;
         this.audio.playAudio(THROW_BOTTLE_AUDIO);
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
      this.audio.playAudio(BGM_AUDIO);
   }

   /**
    * Allocates data to world's variables.
    * @param {leveldata} level
    */
   createBaseWorld(level) {
      this.enemies = this.pushLevelData(level.enemies);
      this.backgroundObjects = this.pushLevelData(level.backgroundObjects);
      this.coins = this.pushLevelData(level.coins);
      this.bottles = this.pushLevelData(level.bottles);
      this.textObjects = this.pushLevelData(level.textObjects);
      this.levelEnd = level.levelEnd;
      this.cameraX = 0;
   }

   /**
    * Pushes data into an array.
    * @param {dataarray} data
    * @returns array
    */
   pushLevelData(data) {
      let array = [];
      for (let i = 0; i < data.length; i++) {
         array.push(data[i]);
      }
      return array;
   }

   /**
    * Creates new instances of single object and gives them "world".
    */
   generateWorld() {
      this.character = new Character(this);
      this.statusbar = new Statusbar(this);
      this.enemyCollison = new EnemyCollision(this);
      this.nonEnemyCollision = new NonEnemyCollision(this);
      this.knockback = new Knockback(this);
   }

   /**
    * Sets "el.world = this" for each object inside arr.
    * @param {arr} arr - object array
    */
   setWorldForAll(arr) {
      arr.forEach((el) => this.setWorldForEach(el));
   }

   /**
    * Gives each single element access to world.
    * @param {array} objArr - object array
    */
   setWorldForEach(objArr) {
      objArr.forEach((e) => {
         e.world = this;
      });
   }

   /**
    * Cooldown timer for throwables.
    */
   bottleCooldown() {
      setTimeout(() => {
         THROW_disabled = false;
      }, bottleCD);
   }

   /**
    * Spawns a new coin on a specific spot after defeating an enemy (see => {@link SmallChicken.canSpawnCoinOnDeath()})
    * @param {x} x - x-coord
    * @param {y} y - y-coord
    */
   spawnCoin(x, y) {
      setTimeout(() => {
         this.coins.push(new Coin(x, y));
         this.coins[this.coins.length - 1].world = this;
      }, msPerFrame * 1.5);
   }

   /**
    * Respwan timer for throwables.
    * @param {object} bottle - current respawning bottle
    */
   respawnBottle(bottle) {
      setTimeout(() => {
         bottle.y = groundLevel - bottle.h;
      }, respawnBottleCD);
   }

   /**
    * Toggle the "pauseInterval"-variables of a specific object.
    * @param {object} obj - object
    * @param {boolean} state
    */
   pauseInterval(obj, state) {
      obj.forEach((o) => {
         o.pauseInterval = state;
      });
   }

   /**
    * Clears EVERY interval.
    */
   clearAllIntervals() {
      let maxIntervalCount = setInterval(() => ';');
      for (let i = 0; i < maxIntervalCount + 1; i++) {
         clearInterval(i);
      }
   }

   /**
    * Cummulated array of main items for the game.
    * @returns
    */
   baseWorld() {
      return [this.enemies, this.backgroundObjects, this.coins, this.bottles, this.textObjects];
   }

   /**
    * Cummulated array of everything inside the game.
    * @returns
    */
   insideWorld() {
      return [...this.baseWorld(), this.character, this.throwable, this.statusbar];
   }

   /**
    * Sets each element inside world back to its spawn point.
    */
   resetSpawns() {
      this.insideWorld().forEach((el) => {
         if (el.length == undefined) {
            el.x = el.spawnX;
         } else {
            el.forEach((e) => (e.x = e.spawnX));
         }
      });
   }

   /**
    * Checks the winning stat of the game and opens the modal for the end screen.
    * @param {boolean} bossDown - Is the boss down?
    */
   characterIsDead(bossDown) {
      this.enemies.forEach((enemy) => {
         this.endEnemyIntervalOnEnd(enemy);
      });
      showEndModal(bossDown);
      this.endIntervalsOnEnd();
      this.audio.prepareAudioForModal(bossDown);
   }

   /**
    * End all intervals after a specific time.
    */
   endIntervalsOnEnd() {
      setTimeout(() => {
         this.clearAllIntervals();
         this.audio.silenceAllBGM(); // <= needs to be revoked to play ending audio!!
      }, 1500);
   }

   /**
    * End main intervals of enemies.
    * @param {object} enemy - enemy object
    */
   endEnemyIntervalOnEnd(enemy) {
      enemy.endInterval(enemy.movementInterval);
      if (!enemy instanceof BigChicken) {
         enemy.endInterval(enemy.animationInterval);
      }
      enemy.endInterval(enemy.jumpInterval);
   }
}

class World extends Drawable {
   // properties connected to world
   enemyCollison;
   nonEnemyCollision;
   knockback;

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
   groundMaxSpeed;
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
      this.createBaseWorld(this.level);
      this.groundMaxSpeed = groundMaxSpd;
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

   playAudio(variable) {
      let audio = variable.object;
      audio.play();
      audio.volume = variable.volume ?? 1;
      audio.currentTime = variable.time ?? audio.currentTime;
      audio.loop = variable.loop ?? false;
   }

   silenceBGM(variable) {
      let audio = variable.object;
      let interval = setInterval(() => {
         let i = audio.volume;
         i -= 0.01;
         if (i <= 0) {
            clearInterval(interval);
         } else {
            audio.volume = i;
         }
      }, 100);
      interval;
   }

   characterIsDead(bossDown) {
      this.enemies.forEach((enemy) => {
         enemy.endInterval(enemy.movementInterval);
         if (!enemy instanceof BigChicken) {
            enemy.endInterval(enemy.animationInterval);
         }
         enemy.endInterval(enemy.jumpInterval);
      });
      showEndModal(bossDown);
      setTimeout(() => {
         this.clearAllIntervals();
         this.silenceAllBGM();
      }, 1100);
      this.prepareAudioForModal(bossDown);
   }

   prepareAudioForModal(bossDown) {
      this.silenceAllBGM();
      setTimeout(() => {
         switch (bossDown) {
            case true:
               this.playAudio(WIN_AUDIO);
               break;
            case false:
               this.playAudio(LOOSE_AUDIO);
               break;
         }
      }, 750);
   }

   silenceAllBGM() {
      this.silenceBGM(BGM_AUDIO);
      this.silenceBGM(BOSS_BGM_AUDIO);
   }
}

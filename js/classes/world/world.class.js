class World extends Drawable {
   // properties connected to world
   character;
   statusbar;
   enemyCollison;
   nonEnemyCollision;
   knockback;
   enemies = level0.enemies;
   backgroundObjects = level0.backgroundObjects;

   throwable = [];
   coins = level0.coins;
   bottles = level0.bottles;
   textObjects = level0.textObjects;
   // camera movement
   groundMaxSpeed;
   cameraX = 0;
   levelEnd = level0.levelEnd;

   bottleInterval = setInterval(() => {
      if (THROW && !THROW_disabled && !KEYS_disabled && this.statusbar.bottleAmount > 0) {
         this.statusbar.bottleAmount -= 1;
         THROW_disabled = true;
         this.throwable.push(new ThrowableObject(this));
         this.throwable[this.throwable.length - 1].world = this;
         this.bottleCooldown();
      }
   }, msPerCheck);

   constructor() {
      super();
      this.groundMaxSpeedAdjustment();
      this.generateWorld();
      this.setWorldForAll([
         this.enemies,
         this.backgroundObjects,
         this.coins,
         this.bottles,
         this.textObjects,
      ]);
      this.draw();
   }

   generateWorld() {
      this.character = new Character(this);
      this.statusbar = new Statusbar(this);
      this.enemyCollison = new EnemyCollision(this);
      this.nonEnemyCollision = new NonEnemyCollision(this);
      this.knockback = new Knockback(this);
   }

   groundMaxSpeedAdjustment() {
      if (Math.abs(groundMaxSpd) < 1) {
         this.groundMaxSpeed = groundMaxSpd;
      } else {
         this.groundMaxSpeed = Math.round(groundMaxSpd);
      }
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
}

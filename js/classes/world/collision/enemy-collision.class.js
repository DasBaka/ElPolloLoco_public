class EnemyCollision {
   world;

   enemyCollisionInterval = setInterval(() => {
      this.bottleAndEnemyCollision();
      this.charAndEnemyCollision();
   }, msPerCheck);

   constructor(world) {
      this.world = world;
   }

   charAndEnemyCollision() {
      this.world.enemies.forEach((enemy) => {
         this.enemyCollidesWithCharacter(enemy);
      });
   }

   bottleAndEnemyCollision() {
      this.world.enemies.forEach((enemy) => {
         this.bottleCollidesWithEnemy(enemy);
      });
   }

   bottleCollidesWithEnemy(enemy) {
      let bottle = this.world.throwable[this.world.throwable.length - 1];
      if (this.world.throwable.length != 0) {
         if (bottle.isColliding(enemy)) {
            this.positiveBottleEnemyCollision(bottle, enemy);
         }
      }
   }

   positiveBottleEnemyCollision(bottle, enemy) {
      if (!enemy.invulnerability()) {
         if (enemy instanceof BigChicken) {
            bottle.isHit();
            enemy.isHit();
         } else {
            bottle.isHit();
            enemy.health = 1;
            enemy.isHit();
         }
      }
   }

   enemyCollidesWithCharacter(enemy) {
      let char = this.world.character;
      if (char.isColliding(enemy)) {
         if (char.isAbove) {
            this.characterJumpsOnEnemy(char, enemy);
         } else this.characterGetsHit(char, enemy);
      }
   }

   characterJumpsOnEnemy(char, enemy) {
      if (!enemy.invulnerability()) {
         enemy.isHit();
         if (enemy instanceof BigChicken) {
            char.speedY_rel *= -2;
         } else {
            char.bump();
            this.world.playAudio(PEPE_JUMP_AUDIO);
            this.world.playAudio(PEPE_JUMP_GRUNT_AUDIO);
         }
      }
   }

   characterGetsHit(char, enemy) {
      if (char.isInvincibleWhileJumping()) {
         char.isHit();
         this.world.playAudio(PEPE_HURT_AUDIO);
         this.world.pauseInterval(this.world.enemies, true);
         char.isCharacterDead(false);
         this.world.knockback.knockback(char, enemy);
      }
   }
}

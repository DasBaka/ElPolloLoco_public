class EnemyCollision {
   world;

   /**
    * Checks for enemy collisions between Character and ThrowableObject.
    */
   enemyCollisionInterval = setInterval(() => {
      this.bottleAndEnemyCollision();
      this.charAndEnemyCollision();
   }, msPerCheck);

   constructor(world) {
      this.world = world;
   }

   /**
    * Initializies the collision detection with ThrowableObjects for each enemy.
    */
   bottleAndEnemyCollision() {
      this.world.enemies.forEach((enemy) => {
         this.bottleCollidesWithEnemy(enemy);
      });
   }

   /**
    * Checks for positive collision between a thrown bottle and an enemy.
    * @param {object} enemy - current enemy
    */
   bottleCollidesWithEnemy(enemy) {
      let bottle = this.world.throwable[this.world.throwable.length - 1];
      if (this.world.throwable.length != 0) {
         if (bottle.isColliding(enemy)) {
            this.positiveBottleEnemyCollision(bottle, enemy);
         }
      }
   }

   /**
    * Damages both bottle and enemy because of positive collision.
    * Different damage effects on lesser enemies!
    * @param {object} bottle - bottle object
    * @param {object} enemy - enemy object
    */
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

   /**
    * Initializes the collision detection with the character for each enemy.
    */
   charAndEnemyCollision() {
      this.world.enemies.forEach((enemy) => {
         this.enemyCollidesWithCharacter(enemy);
      });
   }

   /**
    * Checks for positive collision and collision type between the character and an enemy.
    * @param {object} enemy - current enemy object
    */
   enemyCollidesWithCharacter(enemy) {
      let char = this.world.character;
      if (char.isColliding(enemy)) {
         if (char.isAbove) {
            this.characterJumpsOnEnemy(char, enemy);
         } else this.characterGetsHit(char, enemy);
      }
   }

   /**
    * Triggers specific effects, if the character jumps successfully on an enemy from above.
    * @param {object} char - character object
    * @param {object} enemy - enemy object
    */
   characterJumpsOnEnemy(char, enemy) {
      if (!enemy.invulnerability()) {
         enemy.isHit();
         if (enemy instanceof BigChicken) {
            char.speedY_rel *= -1.5;
         } else {
            char.bump();
         }
         this.world.audio.playAudio(PEPE_JUMP_AUDIO);
         this.world.audio.playAudio(PEPE_JUMP_GRUNT_AUDIO);
      }
   }

   /**
    * On unsuccessfull "jump" and successfull collision detection, it triggers several hit functions of the both collisioners.
    * @param {object} char - character object
    * @param {object} enemy - enemy object
    */
   characterGetsHit(char, enemy) {
      if (char.isInvincibleWhileJumping()) {
         char.isHit();
         this.world.audio.playAudio(PEPE_HURT_AUDIO);
         this.world.pauseInterval(this.world.enemies, true);
         char.isCharacterDead(false);
         this.world.knockback.knockback(char, enemy);
      }
   }
}

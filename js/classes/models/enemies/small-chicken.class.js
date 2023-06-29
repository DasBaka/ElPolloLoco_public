class SmallChicken extends JumpableObject {
   data = smallChickenClassData;

   savePosition = 0;
   world;

   constructor(spawn) {
      super().fetchData();
      this.loadImage(this.path);
      this.prepareImage();
      this.letSpawn(spawn);
      this.loadAnimations();
   }

   /**
    * => see: {@link DrawableObject.fetchData()}
    */
   fetchData() {
      super.fetchData();
      this.speedX_rel = this.speedX_rel * this.data['enemySpeedConst'];
   }

   /**
    * Pre-function for moving left.
    * Also:
    * - SmallChicken stops, if pauseInterval is true (=> Character gets hit)
    * - Follows the character with {@link changeDirection()}
    * - if it's not matching the preconditions, it stays at it's spawning point.
    */
   left() {
      if (this.validateLeft()) {
         this.refreshSpeed();
         if (this.pauseInterval) {
            this.speedX = 0;
         }
         this.changeDirection();
         this.moveLeft();
      } else if (this.isOutsideCanvas(this.spawnX)) {
         this.stayAtSpawn();
      }
   }

   /**
    * Let the object stay at spawn.
    */
   stayAtSpawn() {
      this.x = this.spawnX;
   }

   /**
    *  => see {@link MovableObject.fasterIfHit()}
    */
   fasterIfHit() {
      return this.speedX_rel;
   }

   /**
    *  => see {@link MovableObject.validateLeft()}
    */
   validateLeft() {
      return this.isInsideCanvas(this.x);
   }

   /**
    * => see {@link MediumChicken.changeDirection()}
    */
   changeDirection() {
      return;
   }

   /**
    * => see {@link AnimatableObject.isWalking()}
    * @returns true - is always walking
    */
   isWalking() {
      return true;
   }

   /**
    * => see {@link MovableObject.invulnaribility()}
    */
   invulnerability() {
      return !this.timePassed(this.lastHit, invulnerabilityFrames / 2.5);
   }

   /**
    * Spawns a coin after enemy death, if conditions are met.
    */
   canSpawnCoinOnDeath() {
      let random = Math.floor(Math.random() * randomBaseForCoin);
      if (this.coinSpawnCondition(random)) {
         let x = this.x / canvasWidth;
         let y = this.y / canvasHeight;
         this.world.spawnCoin(x, y);
      }
   }

   /**
    * Determines coin spawning chance after enemy death.
    * Also:
    * - 0% chance to drop coin on the first enemy.
    * - 100% chance to drop coin on the next two enemies, because of tutorial.
    * - Regular chance is based on {@link randomBaseForCoin} and {@link randomChanceForCoin}.
    * @param {*} random - random number from Math.random()
    * @returns boolean
    */
   coinSpawnCondition(random) {
      return (
         this != this.world.enemies[0] &&
         (random <= randomChanceForCoin ||
            this == this.world.enemies[1] ||
            this == this.world.enemies[2])
      );
   }
   /**
    * => see {@link MovableObject.isHit()}
    */
   isHit() {
      this.world.playAudio(CHICKEN_CRY_AUDIO);
      super.isHit();
   }

   /**
    * => see {@link MovableObject.noHealth()}
    */
   noHealth() {
      if (this.health == 0) {
         this.world.playAudio(CHICKEN_DEFEAT_AUDIO);
         super.noHealth();
      }
   }
}

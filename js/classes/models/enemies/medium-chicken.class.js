class MediumChicken extends SmallChicken {
   data = mediumChickenClassData;

   world;

   constructor(spawn) {
      super().fetchData();
      this.loadImage(this.path);
      this.prepareImage();
      this.letSpawn(spawn);
      this.loadAnimations();
   }

   /**
    *  => see: {@link JumpableObject.calcSpeed()}
    */
   calcSpeed() {
      return enemyJumpSpeed;
   }

   /**
    * => see {@link JumpableObject.validateBackOnGround()}
    */
   validateOnGround() {
      let random = Math.floor(Math.random() * randomBaseForJump);
      if (this.jumpConditionForEnemy(random)) {
         return true;
      } else {
         return false;
      }
   }

   /**
    * Determines the condition for jump "attacks" of enemies of MediumChicken and above.
    * @param {num} random - calculated number
    * @returns boolean
    */
   jumpConditionForEnemy(random) {
      return random <= randomChanceForJump && !this.inAir && !this.invulnerability();
   }

   /**
    * Negates the current speed value and mirrors the image to change the enemies' walking direction based on {@link playerIsLeft()} and {@link playerIsRight()}.
    */
   changeDirection() {
      if (this.playerIsLeft()) {
         this.speedX_rel *= -1;
         this.refreshSpeed();
         this.otherDirection = true;
      } else if (this.playerIsRight()) {
         this.speedX_rel *= -1;
         this.refreshSpeed();
         this.otherDirection = false;
      }
   }

   /**
    * Logic: Is the player too far to the left, so the enemy has to walk to the right?
    * @returns boolean
    */
   playerIsLeft() {
      return this.world?.character.x - followCoeff * this.w >= this.x && this.speedX > 0;
   }

   /**
    * Logic: Is the player too far to the right, so the enemy has to walk to the left?
    * @returns boolean
    */
   playerIsRight() {
      return this.world?.character.x + followCoeff * this.w <= this.x && this.speedX < 0;
   }
}

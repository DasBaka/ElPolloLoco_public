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

   calcSpeed() {
      return enemyJumpSpeed;
   }

   validateOnGround() {
      let random = Math.floor(Math.random() * randomBaseForJump);
      if (random <= randomChanceForJump && !this.inAir) {
         return true;
      } else {
         return false;
      }
   }

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

   playerIsLeft() {
      return this.world?.character.x - followCoeff * this.w >= this.x && this.speedX > 0;
   }

   playerIsRight() {
      return this.world?.character.x + followCoeff * this.w <= this.x && this.speedX < 0;
   }
}

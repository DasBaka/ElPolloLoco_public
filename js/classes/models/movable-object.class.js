class MovableObject extends DrawableObject {
   data = movableObjectData;
   speedX;
   speedX_rel;

   lastHit = 0;
   pauseInterval = false;

   movementInterval = setInterval(() => {
      this.left();
      this.right();
      this.cameraCheck();
   }, msPerMove);

   constructor() {
      super();
      this.fetchData();
      this.speedY_rel = 0;
   }

   fetchData() {
      super.fetchData();
      this.speedX_rel = this.data['speedX_rel'];
   }

   left() {}

   right() {}

   cameraCheck() {}

   refreshSpeed() {
      let speedX = canvasWidth * this.fasterIfHit();
      if (Math.abs(speedX) < 1) {
         this.speedX = speedX;
      } else {
         this.speedX = Math.round(speedX);
      }
   }

   fasterIfHit() {
      if (this.invulnerability()) {
         return this.speedX_rel * 1.5;
      } else {
         return this.speedX_rel;
      }
   }

   isHit() {
      this.lastHit = new Date().getTime();
      this.health -= 1;
      this.noHealth();
   }

   noHealth() {
      if (this.health == 0) {
         this.noHealthJump();
         this.chickensSpawnCoinsOnDeath();
         this.endIntervalsAfterDeath([
            this.movementInterval,
            this.animationInterval,
            this.idleInterval,
            this.jumpInterval,
         ]);
      }
   }

   chickensSpawnCoinsOnDeath() {
      if (this instanceof (SmallChicken || MediumChicken)) {
         this.spawnCoinOnDeath();
      }
   }

   timePassed(time, seconds) {
      let timepassed = new Date().getTime() - time;
      timepassed = timepassed / 1000;
      return timepassed > seconds;
   }

   invulnerability() {
      return !this.timePassed(this.lastHit, invulnerabilityFrames);
   }

   moveLeft() {
      this.x -= this.speedX;
   }

   moveRight() {
      this.x += this.speedX;
   }

   isColliding(obj) {
      return (
         (this.horizontalCollision(this, obj) || this.horizontalCollision(obj, this)) &&
         (this.verticalCollision(this, obj) || this.verticalCollision(obj, this)) &&
         this.invulnerabilityCheck(obj) &&
         this.healthCheck(obj)
      );
   }

   horizontalCollision(left, right) {
      return (
         this.rightSide(left) > this.leftSide(right) && this.leftSide(right) > this.leftSide(left)
      );
   }

   verticalCollision(top, bottom) {
      return (
         this.bottomSide(top) > this.topSide(bottom) && this.topSide(bottom) > this.topSide(top)
      );
   }

   invulnerabilityCheck(obj) {
      return !this.invulnerability() && !obj.invulnerability();
   }

   healthCheck(obj) {
      return this.health != 0 && obj.health != 0;
   }

   endInterval(fn) {
      clearInterval(fn);
   }

   endIntervalsAfterDeath(arr) {
      setTimeout(() => {
         arr.forEach((interval) => {
            this.endInterval(interval);
         });
      }, cancelInterval);
   }
}

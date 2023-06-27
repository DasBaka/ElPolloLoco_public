class MovableObject extends DrawableObject {
   data = movableObjectData;
   speedX;
   speedX_rel;

   lastHit = 0;
   pauseInterval = false;

   /**
    * Interval for movement checks.
    * If the checks are positive, the corresponding movement will be executed.
    */
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

   /**
    * => see: {@link DrawableObject.fetchData}
    */
   fetchData() {
      super.fetchData();
      this.speedX_rel = this.data['speedX_rel'];
   }

   /**
    * Sets the preconditions to move the object to the left or to react, if the character is moving to the left.
    * for more details, refer to the corresponding object/class.
    */
   left() {}

   /**
    * Sets the preconditions to move the object to the right or to react, if the character is moving to the right.
    * for more details, refer to the corresponding object/class.
    */
   right() {}

   /**
    * Checks the current position based on the characters position. (see more: {@link Character.cameraCheck})
    */
   cameraCheck() {}

   /**
    * Recalculates the objects.speed (after it was changed).
    */
   refreshSpeed() {
      let speedX = canvasWidth * this.fasterIfHit();
      this.speedX = speedX;
   }

   /**
    * Multiplies the current speedX with 1.5, after the object got hit.
    * @returns - New speedX_rel value
    */
   fasterIfHit() {
      if (this.invulnerability()) {
         return this.speedX_rel * speedMultiplierAfterHit;
      } else {
         return this.speedX_rel;
      }
   }

   /**
    * State of getting hit.
    * Results in an updated Time of the last hit, reduced object.health and then checks, if the object has no more health.
    */
   isHit() {
      this.lastHit = new Date().getTime();
      this.health -= 1;
      this.noHealth();
   }

   /**
    * If the object.health reaches 0, this function activates several death-functions.
    */
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

   /**
    * If the object is a non-boss-enemy, this function calls their correspongin function (see: {@link SmallChicken.spawnCoinOnDeath})
    */
   chickensSpawnCoinsOnDeath() {
      if (this instanceof (SmallChicken || MediumChicken)) {
         this.spawnCoinOnDeath();
      }
   }

   /**
    * Checks, if enough time has passed since a specific event.
    * @param {time} time - Date/time of the last time of a specific event
    * @param {time} seconds - time in seconds
    * @returns - boolean
    */
   timePassed(time, seconds) {
      let timepassed = new Date().getTime() - time;
      timepassed = timepassed / 1000;
      return timepassed > seconds;
   }

   /**
    * State of invulnaribility.
    * If {@link timePassed} is false of the event {@link lastHit}, the object can't get hit again.
    * @returns - boolean
    */
   invulnerability() {
      return !this.timePassed(this.lastHit, invulnerabilityFrames);
   }

   /**
    * Moves the object to the left.
    */
   moveLeft() {
      this.x -= this.speedX;
   }

   /**
    * Moves the object to the right.
    */
   moveRight() {
      this.x += this.speedX;
   }

   /**
    * Collision detection.
    * @param {object} obj - the object to detect its collision with this object, which calls this function.
    * @returns - boolean
    */
   isColliding(obj) {
      return (
         (this.horizontalCollision(this, obj) || this.horizontalCollision(obj, this)) &&
         (this.verticalCollision(this, obj) || this.verticalCollision(obj, this)) &&
         this.invulnerabilityCheck(obj) &&
         this.healthCheck(obj)
      );
   }

   /**
    * Checks the horizontal collision.
    * @param {object} left - the object at the left of the collision
    * @param {object} right - object at the right of the collision
    * @returns - boolean
    */
   horizontalCollision(left, right) {
      return (
         this.rightSide(left) > this.leftSide(right) && this.leftSide(right) > this.leftSide(left)
      );
   }

   /**
    * Checks the vertical collision.
    * @param {object} top - the object at the top of the collsion
    * @param {object} bottom - the object at the bottom of the collision
    * @returns - boolean
    */
   verticalCollision(top, bottom) {
      return (
         this.bottomSide(top) > this.topSide(bottom) && this.topSide(bottom) > this.topSide(top)
      );
   }

   /**
    * Checks if either object of a collision is invulnerabel.
    * @param {object} obj - the object to detect its collision with this object, which calls this function.
    * @returns - boolean
    */
   invulnerabilityCheck(obj) {
      return !this.invulnerability() && !obj.invulnerability();
   }

   /**
    * Checks if either object of a collision has more than 0 health.
    * @param {object} obj - the object to detect its collision with this object, which calls this function.
    * @returns - boolean
    */
   healthCheck(obj) {
      return this.health != 0 && obj.health != 0;
   }

   /**
    * If the object reaches 0 health, this function ends all intervals of this object, given by this array.
    * @param {array} arr - array with intervals to end
    */
   endIntervalsAfterDeath(arr) {
      setTimeout(() => {
         arr.forEach((interval) => {
            this.endInterval(interval);
         });
      }, cancelInterval);
   }

   /**
    * Left movement condition.
    * @returns - boolean
    */
   validateLeft() {
      return LEFT && !LEFT_disabled && this.x < this.spawnX && this.world.character.health != 0;
   }

   /**
    * Right movement condition.
    * @returns - boolean
    */
   validateRight() {
      return RIGHT && !RIGHT_disabled && this.world.character.health != 0;
   }
}

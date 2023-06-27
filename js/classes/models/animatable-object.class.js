class AnimatableObject extends MovableObject {
   data = animatableObjectData;

   animationCache;
   health;
   idleSince;
   currentAnimationArray = [];

   walking;
   idle;
   longIdle;
   jumping;
   falling;
   landing;
   hurt;
   dying;

   /**
    * Interval for animations.
    */
   animationInterval = setInterval(() => this.chooseAnimation(), msPerFrame);

   constructor() {
      super();
      this.idleSince = new Date().getTime();
   }

   /**
    * => see: {@link DrawableObject.fetchData}
    */
   fetchData() {
      super.fetchData();
      this.animationCache = this.data['animationCache'];
      this.health = this.data['health'];
   }

   /**
    * Associates the object data's animation images to the corresponding variable.
    */
   associateFrames() {
      this.walking = this.getFrames('walking');
      this.idle = this.getFrames('idle');
      this.longIdle = this.getFrames('longIdle');
      this.jumping = this.getFrames('jumping');
      this.falling = this.getFrames('falling');
      this.landing = this.getFrames('landing');
      this.hurt = this.getFrames('hurt');
      this.dying = this.getFrames('dying');
   }

   /**
    * Catches the frames paths of the object based on the key.
    * If the key is not found, this function does nothing.
    * @param {key} key - name of the animation
    * @returns - array of image paths
    */
   getFrames(key) {
      let array = [];
      let state = this.animationCache[key];
      if (state ?? false) {
         for (let i = 0; i < state.length; i++) {
            array.push(state[i]);
         }
         return array;
      }
   }

   /**
    * Based on logical arguments, this function determines, which animation should be played.
    */
   chooseAnimation() {
      if (this.isDead()) {
         this.playAnimation(this.dying);
      } else if (this.isHurt()) {
         this.playAnimation(this.hurt);
      } else if (this.isFalling()) {
         this.playAnimation(this.falling);
      } else if (this.isJumping()) {
         this.playAnimation(this.jumping);
      } else if (this.isWalking()) {
         this.playAnimation(this.walking);
      } else if (this.isLongIdle()) {
         this.snoring();
      } else this.playAnimation(this.idle);
   }

   /**
    * Loads the animation image paths catched by {@link getFrames} and generates new Image classes.
    */
   loadAnimations() {
      this.associateFrames();
      Object.keys(this.animationCache).forEach((key) => {
         this.loadImages(this.animationCache[key]);
      });
   }

   /**
    * Logic: The object has no more health.
    * @returns - boolean
    */
   isDead() {
      return this.health == 0;
   }

   /**
    * Logic: The object got hit.
    * @returns - boolean
    */
   isHurt() {
      return false;
   }

   /**
    * Logic: The object is in a falling state (positive speedY value).
    * @returns - boolean
    */
   isFalling() {
      return false;
   }

   /**
    * Logic: The object is in a jumping state (negative speedY value).
    * @returns - boolean
    */
   isJumping() {
      return false;
   }

   /**
    * Logic: The object is moving to the left or right.
    * @returns - boolean
    */
   isWalking() {
      return false;
   }

   /**
    * Logic: A long time has passed, since the last button press and/or movement.
    * @returns - boolean
    */
   isLongIdle() {
      return false;
   }

   /**
    * Sets a new timestamp if the Character is idle.
    */
   setIdleTime() {
      if (this instanceof Character) {
         if (this.validateIdle()) {
            this.idleSince = new Date().getTime();
         }
      }
   }

   /**
    * Logic: The Object is idle, if no other animation precondition is active or the THROW button were pressed.
    * @returns - boolean
    */
   validateIdle() {
      return (
         this.isDead() ||
         this.isHurt() ||
         this.isFalling() ||
         this.isJumping() ||
         this.isWalking() ||
         THROW
      );
   }

   /**
    * Prepares the animation.
    * @param {array} arr - array of images for the animation.
    */
   playAnimation(arr) {
      this.startAnimationFromBeginning(arr);
      let i = this.currentImg % arr.length;
      this.playFrames(i, arr);
   }

   /**
    * Resets the animation counter to 0, as soon as a new/other animation plays.
    * @param {array} arr - array of images for the animation.
    */
   startAnimationFromBeginning(arr) {
      if (arr != this.currentAnimationArray) {
         this.currentImg = 0;
         this.currentAnimationArray = arr;
      }
   }

   /**
    * Switches the current image with a new image, as long as no "stop"-string is inside the array, to prevent the animation loop.
    * @param {num} i - current image index
    * @param {array} arr - array of images for the animation.
    */
   playFrames(i, arr) {
      if (arr[i] != 'stop') {
         let path = arr[i];
         this.img = this.imgCache[path];
         this.currentImg++;
      }
   }

   snoring() {
      return;
   }
}

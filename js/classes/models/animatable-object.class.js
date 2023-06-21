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

   animationInterval = setInterval(() => {
      this.chooseAnimation();
   }, msPerFrame);

   idleInterval = setInterval(() => {
      this.setIdleTime();
   }, msPerCheck);

   constructor() {
      super();
      this.idleSince = new Date().getTime();
   }

   fetchData() {
      super.fetchData();
      this.animationCache = this.data['animationCache'];
      this.health = this.data['health'];
   }

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
         this.otherDirection = false;
         this.playAnimation(this.longIdle);
      } else this.playAnimation(this.idle);
   }

   loadAnimations() {
      this.associateFrames();
      Object.keys(this.animationCache).forEach((key) => {
         this.loadImages(this.animationCache[key]);
      });
   }

   isDead() {
      return this.health == 0;
   }

   isHurt() {
      return false;
   }

   isFalling() {
      return false;
   }

   isJumping() {
      return false;
   }

   isWalking() {
      return false;
   }

   isLongIdle() {
      return false;
   }

   setIdleTime() {
      if (this instanceof Character) {
         if (this.validateIdle()) {
            this.idleSince = new Date().getTime();
         }
      }
   }

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

   playAnimation(arr) {
      this.startAnimationFromBeginning(arr);
      let i = this.currentImg % arr.length;
      this.playFrames(i, arr);
   }

   startAnimationFromBeginning(arr) {
      if (arr != this.currentAnimationArray) {
         this.currentImg = 0;
         this.currentAnimationArray = arr;
      }
   }

   playFrames(i, arr) {
      if (arr[i] != 'stop') {
         let path = arr[i];
         this.img = this.imgCache[path];
         this.currentImg++;
      }
   }
}

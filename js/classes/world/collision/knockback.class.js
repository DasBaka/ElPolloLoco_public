class Knockback {
   world;

   constructor(world) {
      this.world = world;
   }

   knockback(target, relation) {
      disableKeys();
      let interval = this.knockbackDirection(target, relation);
      interval;
      setTimeout(() => {
         this.endKnockback(target, interval);
      }, invulnerabilityFrames * 1000);
   }

   knockbackDirection(target, relation) {
      let interval = setInterval(() => {
         if (relation.x > target.x) {
            LEFT = true;
         }
         if (relation.x < target.x) {
            RIGHT = true;
         }
      }, 1);
      return interval;
   }

   endKnockback(target, interval) {
      clearInterval(interval);
      if (target.health > 0) {
         enableKeys();
         this.world.pauseInterval(this.world.enemies, false);
      }
   }
}

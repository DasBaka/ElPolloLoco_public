class Knockback {
   world;

   constructor(world) {
      this.world = world;
   }

   /**
    * Creates a knockback effect for the character on hit.
    * @param {object} target - target to get knockbacked (character)
    * @param {object} relation - object, which causes the knockback
    */
   knockback(target, relation) {
      if (target instanceof Character) {
         PEPE_WALKING_AUDIO.object.pause();
      }
      disableKeys();
      let interval = this.knockbackDirection(target, relation);
      interval;
      setTimeout(() => {
         this.endKnockback(target, interval);
      }, invulnerabilityFrames * 1000);
   }

   /**
    * In relation to the knockback cause, this function defines the knockback direction of the character and creates an interval for this type.
    * @param {object} target - target to get knockbacked (character)
    * @param {object} relation - object, which causes the knockback
    * @returns interval
    */
   knockbackDirection(target, relation) {
      let interval = setInterval(() => {
         if (relation.x > target.x) {
            LEFT = true;
            LEFT_disabled = false;
         }
         if (relation.x < target.x) {
            RIGHT = true;
            RIGHT_disabled = false;
         }
      }, 1);
      return interval;
   }

   /**
    * Ends the knockback interval, as long as the character has health.
    * @param {object} target - target to get knockbacked (character)
    * @param {interval} interval - interval to clear
    */
   endKnockback(target, interval) {
      clearInterval(interval);
      if (target.health > 0) {
         enableKeys();
         this.world.pauseInterval(this.world.enemies, false);
      }
      this.world.statusbar.potentialHeal();
   }
}

class Statusbar extends DrawableObject {
   data = statusbarObjectData;
   hearts = [];
   bottle = [];
   coin = [];
   max = [];
   coinText;
   coinTextX;
   coinTextY;
   world;

   currentCoinAmount;
   bottleAmount;
   maxHealth;
   maxBottle;

   /**
    * Interval to update amount changes of consumables or character.health.
    */
   updateStats = setInterval(() => {
      this.checkStatValues(this.hearts, this.currentHealth(), heartsData, this.maxHealth);
      this.checkStatValues(this.bottle, this.bottleAmount, bottleData, this.maxBottle);
      this.renderCoinText();
      this.isMaxValue();
   }, msPerCheck);

   constructor(world) {
      super();
      this.fetchData();
      this.world = world;
      this.initIcons(this.hearts, heartsData, this.currentHealth());
      this.initIcons(this.bottle, bottleData, this.bottleAmount);
      this.initIcons(this.coin, coinData, 1);
      this.renderCoinText();
   }

   /**
    * => see {@link DrawableObject.fetchData()}
    */
   fetchData() {
      this.maxHealth = this.data['maxHealth'];
      this.maxBottle = this.data['maxBottle'];
      this.currentCoinAmount = this.data['startCoins'];
      this.bottleAmount = this.data['startBottles'];
   }

   /**
    * Parent function of {@link Icon.renderIcon()} to push arrays into it.
    * @param {variable} arr - statusbar array matching the icon data
    * @param {array} data - icon data array
    * @param {num} statNum - nth icon
    */
   renderIcons(arr, data, statNum) {
      arr.push(new Icon(data.activeIcon, statNum, data.offsetY, data.offsetX));
   }

   /**
    * Initializes the render function for all objects inside the icon data array.
    * @param {variable} arr - statusbar array matching the icon data
    * @param {array} data - icon data array
    * @param {num} statNum - nth icon
    */
   initIcons(arr, data, statnum) {
      for (let i = 0; i < statnum; i++) {
         this.renderIcons(arr, data, i);
      }
   }

   /**
    * Short for {@link Chracter.health}
    * @returns num
    */
   currentHealth() {
      return this.world.character.health;
   }

   /**
    * Checks for amount changes and alters them if needed.
    * @param {array} arrToCheck - array to check for changes
    * @param {num} compValue - value to compare the array length against
    * @param {array} data - data array needed to rerender the icons
    * @param {num} max - maximum value of the checked icon
    */
   checkStatValues(arrToCheck, compValue, data, max) {
      if (compValue < arrToCheck.length) {
         arrToCheck.splice([arrToCheck.length - 1], 1);
      } else if (compValue > arrToCheck.length && compValue <= max) {
         this.renderIcons(arrToCheck, data, compValue - 1);
      }
   }

   /**
    * Render the text at the right of the coin icon.
    */
   renderCoinText() {
      this.coinText = 'x ' + this.currentCoinAmount;
      this.coinTextX = this.coin[0].x + this.coin[0].w * 1.1;
      this.coinTextY = this.coin[0].h * 0.64;
   }

   /**
    * Updates the current coin amount.
    * @param {arr} arr - array to change / subtract the currently collected coin
    * @param {index} index - index of the subtracted coin
    */
   updateCoinValue(arr, index) {
      arr.splice(index, 1);
      this.currentCoinAmount += 1;
   }

   /**
    * Updates the current bottle amount and return the bottles.y back to {@link World.respawnBottle()}
    * @param {arr} arr - array to read for the collected bottle
    * @param {index} index - index of the collected bottle
    */
   updateBottleValue(arr, index) {
      let self = arr[index];
      self.y = canvasHeight + self.h;
      this.bottleAmount += 1;
      this.world.respawnBottle(self);
   }

   /**
    * Checks for a reached max value and pushes "MAX"-text-data into the max-array.
    */
   isMaxValue() {
      let itemArray = [this.hearts, this.bottle];
      let checkArray = [this.heartsIsMax(), this.bottleIsMax()];
      let maxArray = [];
      itemArray.forEach((array, index) => {
         if (checkArray[index]) {
            maxArray.push(this.maxTextCoords(array));
         } else {
            maxArray.push({});
         }
      });
      this.max = maxArray;
   }

   /**
    * Coordinates of the corresponding "MAX"-text.
    * @param {array} arr - corresponding array for the max-text
    * @returns
    */
   maxTextCoords(arr) {
      let lastItem = arr[arr.length - 1];
      return {
         x: lastItem.x,
         y: lastItem.y + lastItem.h * 1.11,
      };
   }

   /**
    * Logic: is the maximum hearts amount reached?
    * @returns boolean
    */
   heartsIsMax() {
      return this.world.character.health == this.maxHealth;
   }

   /**
    * Logic: is the maximum bottles amount reached?
    * @returns boolean
    */
   bottleIsMax() {
      return this.bottleAmount == this.maxBottle;
   }
}

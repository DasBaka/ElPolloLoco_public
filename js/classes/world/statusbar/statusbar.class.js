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

   fetchData() {
      this.maxHealth = this.data['maxHealth'];
      this.maxBottle = this.data['maxBottle'];
      this.currentCoinAmount = this.data['startCoins'];
      this.bottleAmount = this.data['startBottles'];
   }

   renderIcons(arr, data, statNum) {
      arr.push(new Icon(data.activeIcon, statNum, data.offsetY, data.offsetX));
   }

   initIcons(arr, data, statnum) {
      for (let i = 0; i < statnum; i++) {
         this.renderIcons(arr, data, i);
      }
   }

   currentHealth() {
      return this.world.character.health;
   }

   checkStatValues(arrToCheck, compValue, data, max) {
      if (compValue < arrToCheck.length) {
         arrToCheck.splice([arrToCheck.length - 1], 1);
      } else if (compValue > arrToCheck.length && compValue <= max) {
         this.renderIcons(arrToCheck, data, compValue - 1);
      }
   }

   renderCoinText() {
      this.coinText = 'x ' + this.currentCoinAmount;
      this.coinTextX = this.coin[0].x + this.coin[0].w * 1.1;
      this.coinTextY = this.coin[0].h * 0.64;
   }

   updateCoinValue(arr, index) {
      arr.splice(index, 1);
      this.currentCoinAmount += 1;
   }

   updateBottleValue(arr, index) {
      let self = arr[index];
      self.y = canvasHeight + self.h;
      this.bottleAmount += 1;
      this.world.respawnBottle(self);
   }

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

   maxTextCoords(arr) {
      let lastItem = arr[arr.length - 1];
      return {
         x: lastItem.x,
         y: lastItem.y + lastItem.h * 1.11,
      };
   }

   heartsIsMax() {
      return this.world.character.health == this.maxHealth;
   }

   bottleIsMax() {
      return this.bottleAmount == this.maxBottle;
   }
}

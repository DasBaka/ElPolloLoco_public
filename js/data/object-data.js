let drawableObjectData = {
   // default values
   x_rel: 0,
   w_rel: 0,
   h_rel: 0,
   leftOffset: 0,
   rightOffset: 1,
   bottomOffset: 1,
   topOffset: 0,
};

let statusbarObjectData = {
   maxHealth: 5,
   maxBottle: 3,
   startCoins: 0,
   startBottles: 0,
};

let movableObjectData = {
   // default values
   speedX_rel: 1,
};

let backgroundObjectsData = {
   x_rel: 0,
   w_rel: 2,
   h_rel: 1,
};

let animatableObjectData = {
   // default values
   animationCache: '',
   health: 0,
};

let iconClassData = {
   x_rel: 0,
   w_rel: 0.066,
   h_rel: 0.11,
};

let characterClassData = {
   x_rel: 0.36,
   w_rel: 0.18,
   h_rel: 0.6,
   leftOffset: 0.2,
   rightOffset: 0.7,
   bottomOffset: 0.96,
   topOffset: 0.5,
   speedX_rel: pepeSpeed,
   animationCache: pepeAnimations,
   health: 4,
   path: pepeAnimations['idle'][1],
};

let smallChickenClassData = {
   w_rel: 0.1,
   h_rel: 0.15,
   leftOffset: 0.175,
   rightOffset: 0.825,
   bottomOffset: 0.825,
   topOffset: 0.175,
   speedX_rel: pepeSpeed,
   enemySpeedConst: 0.6,
   animationCache: smallChickenAnimations,
   health: 1,
   path: smallChickenAnimations['walking'][1],
};

let mediumChickenClassData = {
   w_rel: 0.125,
   h_rel: 0.25,
   leftOffset: 0.075,
   rightOffset: 0.925,
   bottomOffset: 0.8,
   topOffset: 0.125,
   speedX_rel: pepeSpeed,
   enemySpeedConst: 0.75,
   animationCache: mediumChickenAnimations,
   health: 3,
   path: mediumChickenAnimations['walking'][1],
};

let bigChickenClassData = {
   w_rel: 0.55,
   h_rel: 1.05,
   leftOffset: 0.12,
   rightOffset: 0.86,
   bottomOffset: 0.89,
   topOffset: 0.175,
   speedX_rel: pepeSpeed,
   enemySpeedConst: 0.3,
   animationCache: bigChickenAnimations,
   health: 5,
   maxHealth: 5,
   path: bigChickenAnimations['walking'][1],
};

let throwableObjectData = {
   w_rel: 0.075,
   h_rel: 0.15,
   leftOffset: 0.1,
   rightOffset: 0.9,
   bottomOffset: 0.9,
   topOffset: 0.1,
   speedX_rel: 0,
   animationCache: bottleAnimations,
   health: 1,
   path: bottleAnimations['falling'][3],
};

let heartsData = {
   activeIcon: heartIcon,
   offsetY: 0,
   offsetX: 0,
};

let coinData = {
   activeIcon: coinIcon,
   offsetY: 1,
   offsetX: 11,
};

let bottleData = {
   activeIcon: bottleIcon,
   offsetY: 3,
   offsetX: 18,
};

let coinObjectData = {
   w_rel: 0.08,
   h_rel: 0.13,
   leftOffset: 0.2,
   rightOffset: 0.825,
   bottomOffset: 0.825,
   topOffset: 0.2,
   speedX_rel: 0,
   animationCache: coinAnimation,
   health: 1,
   path: coinAnimation['idle'][0],
};

let tabascoObjectData = {
   w_rel: 0.12,
   h_rel: 0.2,
   leftOffset: 0.3,
   rightOffset: 0.9,
   bottomOffset: 0.96,
   topOffset: 0.14,
   speedX_rel: 0,
   health: 1,
   path: bottleImage,
};

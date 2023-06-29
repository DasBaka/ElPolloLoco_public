// Drawable
// responsive canvas with good resolution
let canvasWidth = window.innerWidth;
let heightRatio = 9 / 16;
let canvasHeight = canvasWidth * heightRatio;

// y-height of the ground
let groundLevelRatio = 0.1;
let groundLevel = Math.floor(canvasHeight * (1 - groundLevelRatio));

// Timer
const msPerFrame = 80;
const msPerMove = 8;
const msPerCheck = 16;
// time between hits to cancel multiple interval calls in seconds
const invulnerabilityFrames = 0.9;
// Bottle Cooldown
const bottleCD = 1250;
const respawnBottleCD = 3000;
// To cancel object intervals after death
const cancelInterval = 1250;

// Global
// global parameters for math
const pepeSpeed = 0.00275;
const speedMultiplierAfterHit = 1.5;
const bottleLeftSidePosition = 0.165;
const bottleRightSidePosition = 0.66;

// Text
const maxTextHeight = 0.2;
const fillColor = '#000000';
const strokeColor = '#FF9D00';
const smallFont = 2.4;
const mediumFont = 3;
const largeFont = 3.6;

// Gravitation
const adjustJumpInterval = 1.25;
const acceleration = 1 / 4000;
const speedAfterHit = 0.004;
const pepeJumpSpeed = 0.0075;
const bumpCoeff = -1.018;

// hitbox adjustments of enemy collision detection
const jumpCollisionAdjustment = 0.5;

// Enemy
const spawnCoeff = 0.8; // min. 1 - character.x_rel !! else: Enemy can spawn inside Screen.
const enemyJumpSpeed = 0.0069;
const randomBaseForJump = 1000;
const randomChanceForJump = 8;
const randomBaseForCoin = 100;
const randomChanceForCoin = 24;
const followCoeff = 2.1;

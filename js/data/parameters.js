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
const msPerCheck = 8;
// time between hits to cancel multiple interval calls in seconds
const invulnerabilityFrames = 0.9;
// Bottle Cooldown
const bottleCD = 1750;
const respawnBottleCD = 3500;
const cancelInterval = 1500;

// Global
// global parameters for math
const pepeSpeed = 0.002;
const bgBaseSpeed = 2;
const groundMaxSpdRel = (pepeSpeed / 10) * (1 - Math.pow(bgBaseSpeed, 2.5));
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
const acceleration = 1 / 4250;
const speedAfterHit = 0.004;
const pepeJumpSpeed = 0.0072;
const bumpCoeff = -1.025;

// hitbox adjustments of enemy collision detection
const jumpCollisionAdjustment = 0.5;

// Enemy
const spawnCoeff = 0.64; // min. 1 - character.x_rel !! else: Enemy can spawn inside Screen.
const enemyJumpSpeed = 0.006;
const randomBaseForJump = 1000;
const randomChanceForJump = 5;
const randomBaseForCoin = 100;
const randomChanceForCoin = 20;
const followCoeff = 2.75;

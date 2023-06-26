let BGM_AUDIO = new Audio('audio/bgm.mp3');

function playBGMusic() {
   let audio = BGM_AUDIO;
   audio.play();
   audio.volume = 0;
   audio.loop = true;
   audio.currentTime = 0;
}

let PEPE_JUMP_GRUNT_AUDIO = new Audio('audio/jump_grunt.mp3');

function playPepeJumpGrunt() {
   let audio = PEPE_JUMP_GRUNT_AUDIO;
   audio.play();
   audio.volume = 0.6;
   audio.currentTime = 0.04;
}

let PEPE_JUMP_AUDIO = new Audio('audio/pepe_jump.mp3');

function playPepeJumpingSound() {
   let audio = PEPE_JUMP_AUDIO;
   audio.play();
   audio.volume = 0.8;
   audio.currentTime = 0.04;
}

let COIN_GRAB_AUDIO = new Audio('audio/coin.mp3');

function playCoinGrabSound() {
   let audio = COIN_GRAB_AUDIO;
   audio.play();
   audio.currentTime = 0;
   audio.volume = 0.25;
}

let BIG_BAWK_AUDIO = new Audio('audio/big_bawk.mp3');

function playBigBawkSound() {
   let audio = BIG_BAWK_AUDIO;
   audio.play();
   audio.currentTime = 0;
   audio.volume = 0.6;
}

let BIG_CHICKEN_CRY_AUDIO = new Audio('audio/kikerikii.mp3');

function playBigChickenDefeatSound() {
   let audio = BIG_CHICKEN_CRY_AUDIO;
   audio.play();
   audio.volume = 0.25;
}

let CHICKEN_CRY_AUDIO = new Audio('audio/bawk.mp3');

function playChickenCrySound() {
   let audio = CHICKEN_CRY_AUDIO;
   audio.play();
   audio.currentTime = 0.6;
   audio.volume = 1;
}

let CHICKEN_DEFEAT_AUDIO = new Audio('audio/chicken_deathjump.mp3');

function playChickenDefeatSound() {
   let audio = CHICKEN_DEFEAT_AUDIO;
   audio.play();
   audio.currentTime = 0;
   audio.volume = 0.75;
}

let PEPE_WALKING_AUDIO = new Audio('audio/walking.mp3');

function playFootstepsSound() {
   let audio = PEPE_WALKING_AUDIO;
   audio.play();
   audio.loop = true;
   audio.volume = 0.9;
}

let GET_HEALTH_AUDIO = new Audio('audio/health_up.mp3');

function playHealthSound() {
   let audio = GET_HEALTH_AUDIO;
   audio.play();
}

let PEPE_HURT_AUDIO = new Audio('audio/pepe_hurt.mp3');

function playPepeHurtSound() {
   let audio = PEPE_HURT_AUDIO;
   audio.play();
   audio.currentTime = 0.25;
}

let allAudio = [
   BGM_AUDIO,
   PEPE_JUMP_GRUNT_AUDIO,
   PEPE_JUMP_AUDIO,
   COIN_GRAB_AUDIO,
   BIG_BAWK_AUDIO,
   BIG_CHICKEN_CRY_AUDIO,
   CHICKEN_CRY_AUDIO,
];

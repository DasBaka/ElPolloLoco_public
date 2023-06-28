let BGM_AUDIO = {
   object: new Audio('audio/bgm.mp3'),
   volume: 0.25,
   loop: true,
};

let BOSS_BGM_AUDIO = {
   object: new Audio('audio/boss_bgm.mp3'),
   volume: 0.4,
   time: 1,
   loop: true,
};

let PEPE_JUMP_GRUNT_AUDIO = {
   object: new Audio('audio/jump_grunt.mp3'),
   volume: 0.6,
   time: 0.04,
};

let PEPE_JUMP_AUDIO = {
   object: new Audio('audio/pepe_jump.mp3'),
   volume: 0.8,
   time: 0.04,
};

let COIN_GRAB_AUDIO = {
   object: new Audio('audio/coin.mp3'),
   time: 0,
   volume: 0.25,
};

let BIG_BAWK_AUDIO = {
   object: new Audio('audio/big_bawk.mp3'),
   time: 0,
   volume: 0.6,
};

let BIG_CHICKEN_CRY_AUDIO = {
   object: new Audio('audio/kikerikii.mp3'),
   volume: 0.25,
};

let CHICKEN_CRY_AUDIO = {
   object: new Audio('audio/bawk.mp3'),
   time: 0.6,
   volume: 1,
};

let CHICKEN_DEFEAT_AUDIO = {
   object: new Audio('audio/chicken_deathjump.mp3'),
   time: 0,
   volume: 0.75,
};

let PEPE_WALKING_AUDIO = {
   object: new Audio('audio/walking.mp3'),
   loop: true,
   volume: 1,
};

let GET_HEALTH_AUDIO = {
   object: new Audio('audio/health_up.mp3'),
};

let PEPE_HURT_AUDIO = {
   object: new Audio('audio/pepe_hurt.mp3'),
   time: 0.25,
};

let THROW_BOTTLE_AUDIO = {
   object: new Audio('audio/throw_bottle.mp3'),
   time: 0,
};

let COLLECT_BOTTLE_AUDIO = {
   object: new Audio('audio/collect_bottle.mp3'),
   time: 0,
   volume: 0.9,
};

let BOTTLE_BREAKS_AUDIO = {
   object: new Audio('audio/break_bottle.mp3'),
   time: 0.5,
   volume: 0.6,
};

let WIN_AUDIO = {
   object: new Audio('audio/win.mp3'),
};

let LOOSE_AUDIO = {
   object: new Audio('audio/loose.mp3'),
   volume: 0.5,
};

let SNORE_AUDIO = {
   object: new Audio('audio/snore.mp3'),
   time: 1.5,
   loop: true,
};

let allAudio = [
   BGM_AUDIO,
   BOSS_BGM_AUDIO,
   PEPE_JUMP_GRUNT_AUDIO,
   PEPE_JUMP_AUDIO,
   COIN_GRAB_AUDIO,
   BIG_BAWK_AUDIO,
   BIG_CHICKEN_CRY_AUDIO,
   CHICKEN_CRY_AUDIO,
   CHICKEN_DEFEAT_AUDIO,
   PEPE_WALKING_AUDIO,
   GET_HEALTH_AUDIO,
   PEPE_HURT_AUDIO,
   THROW_BOTTLE_AUDIO,
   COLLECT_BOTTLE_AUDIO,
   BOTTLE_BREAKS_AUDIO,
   WIN_AUDIO,
   LOOSE_AUDIO,
   SNORE_AUDIO,
];

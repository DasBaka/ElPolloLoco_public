// Background
const backgroundLayers = [
   'img/5_background/layers/3_third_layer/full.png',
   'img/5_background/layers/2_second_layer/full.png',
   'img/5_background/layers/1_first_layer/full.png',
];

const cloudObj = [
   'img/5_background/layers/4_clouds/1.png',
   'img/5_background/layers/4_clouds/2.png',
];

// Character
const pepeAnimations = {
   idle: [
      'img/2_character_pepe/1_idle/idle/I-5.png',
      'img/2_character_pepe/1_idle/idle/I-5.png',
      'img/2_character_pepe/1_idle/idle/I-6.png',
      'img/2_character_pepe/1_idle/idle/I-6.png',
      'img/2_character_pepe/1_idle/idle/I-7.png',
      'img/2_character_pepe/1_idle/idle/I-7.png',
      'img/2_character_pepe/1_idle/idle/I-8.png',
      'img/2_character_pepe/1_idle/idle/I-8.png',
      'img/2_character_pepe/1_idle/idle/I-9.png',
      'img/2_character_pepe/1_idle/idle/I-9.png',
   ],

   longIdle: [
      'img/2_character_pepe/1_idle/long_idle/I-11.png',
      'img/2_character_pepe/1_idle/long_idle/I-12.png',
      'img/2_character_pepe/1_idle/long_idle/I-13.png',
      'img/2_character_pepe/1_idle/long_idle/I-14.png',
      'img/2_character_pepe/1_idle/long_idle/I-15.png',
      'img/2_character_pepe/1_idle/long_idle/I-16.png',
      'img/2_character_pepe/1_idle/long_idle/I-17.png',
      'img/2_character_pepe/1_idle/long_idle/I-18.png',
      'img/2_character_pepe/1_idle/long_idle/I-19.png',
      'img/2_character_pepe/1_idle/long_idle/I-20.png',
   ],

   walking: [
      'img/2_character_pepe/2_walk/W-21.png',
      'img/2_character_pepe/2_walk/W-22.png',
      'img/2_character_pepe/2_walk/W-23.png',
      'img/2_character_pepe/2_walk/W-24.png',
      'img/2_character_pepe/2_walk/W-25.png',
      'img/2_character_pepe/2_walk/W-26.png',
   ],

   jumping: ['img/2_character_pepe/3_jump/J-34.png'],

   falling: ['img/2_character_pepe/3_jump/J-36.png'],

   landing: [
      'img/2_character_pepe/3_jump/J-37.png',
      'img/2_character_pepe/3_jump/J-38.png',
      'img/2_character_pepe/3_jump/J-39.png',
   ],

   hurt: [
      'img/2_character_pepe/4_hurt/H-41.png',
      'img/2_character_pepe/4_hurt/H-42.png',
      'img/2_character_pepe/4_hurt/H-43.png',
   ],

   dying: [
      'img/2_character_pepe/5_dead/D-51.png',
      'img/2_character_pepe/5_dead/D-52.png',
      'img/2_character_pepe/5_dead/D-53.png',
      'img/2_character_pepe/5_dead/D-54.png',
      'img/2_character_pepe/5_dead/D-55.png',
      'img/2_character_pepe/5_dead/D-56.png',
      'img/2_character_pepe/5_dead/D-57.png',
      '',
      'stop',
   ],
};

// Items
// Throwable
const bottleAnimations = {
   falling: [
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
   ],
   dying: [
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
      '',
      'stop',
   ],
};

// Coin
const coinAnimation = {
   idle: [
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_2.png',
      'img/8_coin/coin_2.png',
      'img/8_coin/coin_2.png',
      'img/8_coin/coin_2.png',
      'img/8_coin/coin_2.png',
      'img/8_coin/coin_2.png',
      'img/8_coin/coin_2.png',
   ],
};

// Bottle
const bottleImage = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];

// Statusbar
const heartIcon = ['img/7_statusbars/3_icons/icon_health.png'];
const coinIcon = ['img/7_statusbars/3_icons/icon_coin.png'];
const bottleIcon = ['img/7_statusbars/3_icons/icon_salsa_bottle.png'];

//Enemies
// Small Chicken
const smallChickenAnimations = {
   walking: [
      'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
   ],
   dying: ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'],
};

const mediumChickenAnimations = {
   walking: [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
   ],
   dying: ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'],
};

const bigChickenAnimations = {
   walking: [
      'img/4_enemie_boss_chicken/1_walk/G1.png',
      'img/4_enemie_boss_chicken/1_walk/G1.png',
      'img/4_enemie_boss_chicken/1_walk/G2.png',
      'img/4_enemie_boss_chicken/1_walk/G2.png',
      'img/4_enemie_boss_chicken/1_walk/G3.png',
      'img/4_enemie_boss_chicken/1_walk/G3.png',
      'img/4_enemie_boss_chicken/1_walk/G4.png',
      'img/4_enemie_boss_chicken/1_walk/G4.png',
   ],
   hurt: [
      'img/4_enemie_boss_chicken/4_hurt/G21.png',
      'img/4_enemie_boss_chicken/4_hurt/G22.png',
      'img/4_enemie_boss_chicken/4_hurt/G23.png',
   ],
   dying: [
      'img/4_enemie_boss_chicken/4_hurt/G21.png',
      'img/4_enemie_boss_chicken/4_hurt/G22.png',
      'img/4_enemie_boss_chicken/4_hurt/G23.png',
      'img/4_enemie_boss_chicken/5_dead/G24.png',
      'img/4_enemie_boss_chicken/5_dead/G25.png',
      'img/4_enemie_boss_chicken/5_dead/G26.png',
      'stop',
   ],
};

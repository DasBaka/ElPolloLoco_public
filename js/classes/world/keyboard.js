// Keyboard
const JUMP_Btn = 'Space';
const JUMP_Btn_alt = '';
const LEFT_Btn = 'ArrowLeft';
const LEFT_Btn_alt = 'KeyA';
const RIGHT_Btn = 'ArrowRight';
const RIGHT_Btn_alt = 'KeyD';
const THROW_Btn = 'ArrowUp';
const THROW_Btn_alt = 'KeyW';

// key states (with disabled status)
let KEYS_disabled = false;
let LEFT = false;
let LEFT_disabled = false;
let RIGHT = false;
let RIGHT_disabled = false;
let JUMP = false;
let JUMP_disabled = false;
let THROW = false;
let THROW_disabled = false;

function enableKeys() {
   KEYS_disabled = false;
   LEFT = false;
   LEFT_disabled = false;
   RIGHT = false;
   RIGHT_disabled = false;
   JUMP = false;
   JUMP_disabled = false;
   THROW = false;
   THROW_disabled = false;
}

/**
 * Changes variable stats to simulate disabled keys.
 */
function disableKeys() {
   enableKeys();
   KEYS_disabled = true;
}

/**
 * Changes variable states according to the input.
 * @param {element} el - input
 * @param {boolean} state - input state
 */
function keyCases(el, state) {
   if (!KEYS_disabled) {
      if (el.code == JUMP_Btn /* || el.code == JUMP_Btn_alt */) {
         JUMP = state;
      } else if (el.code == LEFT_Btn || el.code == LEFT_Btn_alt) {
         LEFT = state;
         RIGHT_disabled = state;
      } else if (el.code == RIGHT_Btn || el.code == RIGHT_Btn_alt) {
         RIGHT = state;
         LEFT_disabled = state;
      } else if (el.code == THROW_Btn || el.code == THROW_Btn_alt) {
         THROW = state;
      }
   }
}

/**
 * Same as {@link disableKeys()} but prevents more.
 */
function disableKeysAfterBossIsDown() {
   disableKeys();
   LEFT_disabled = true;
   RIGHT_disabled = true;
   JUMP_disabled = true;
   THROW_disabled = true;
}

/**
 * Listener for Keydown.
 */
window.addEventListener('keydown', (e) => {
   keyCases(e, true);
});

/**
 * Listener for Keyup.
 */
window.addEventListener('keyup', (e) => {
   keyCases(e, false);
});

/**
 * Mobile version of the Keydown-Listener.
 */
window.addEventListener('touchstart', (e) => {
   if (e.target.getAttribute('name') == 'mobile-button') {
      let el = {};
      el.code = eval(e.target.value);
      keyCases(el, true);
   }
});

/**
 * Mobile version of the Keyup-Listener.
 */
window.addEventListener('touchend', (e) => {
   if (e.target.getAttribute('name') == 'mobile-button') {
      let el = {};
      el.code = eval(e.target.value);
      keyCases(el, false);
   }
});

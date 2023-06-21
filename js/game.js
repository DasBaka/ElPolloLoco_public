let world;

function init() {
   world = new World();
}

window.addEventListener('keydown', (e) => {
   keyCases(e, true);
});

window.addEventListener('keyup', (e) => {
   keyCases(e, false);
});

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

window.addEventListener('blur', () => {
   THROW = false;
   LEFT = false;
   RIGHT = false;
   JUMP = false;
});

/* window.addEventListener('orientationchange', () => {
   window.location.reload();
}); */

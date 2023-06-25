let world;
let modal;

function renderSite() {
   modal = document.getElementById('modal');
   modal.parentElement.style.width = canvasWidth + 'px';
   prepareMainMenu(true);
}

function prepareMainMenu(state) {
   let start = document.getElementById('start');
   if (!start.classList.contains('display-none')) {
      modal.parentElement.classList.toggle('main-menu');
      modal.classList.toggle('isOpen');
      if (!state) {
         start.classList.add('display-none');
         document.getElementById('replay').classList.remove('display-none');
      }
   }
   modal.open = state;
}

function init() {
   prepareMainMenu(false);
   world = new World(level0);
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

function showEndModal(state) {
   let div = document.getElementById('inside-modal');
   div.innerHTML = checkForWin(state);
   toggleDialog();
}

function checkForWin(state) {
   switch (state) {
      case true: //win
         modal.setAttribute('success', '');
         return /*html*/ `Congratulations!`;
      case false: //loose
         modal.setAttribute('failed', '');
         return /*html*/ `Game<br/>Over!`;
   }
}

function toggleDialog() {
   if (!modal.open) {
      modal.showModal();
   } else {
      modal.close();
   }
   modal.classList.toggle('isOpen');
}

function resetGame() {
   world = null;
   toggleDialog();
   enableKeys();
   init();
}

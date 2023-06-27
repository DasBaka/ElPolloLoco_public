let world;
let modal;

muteAllAudio();
screen.orientation.lock('landscape').catch(() => {
   return;
});

function renderSite() {
   modal = document.getElementById('modal');
   modal.parentElement.parentElement.style.height =
      Math.min(Math.max(0.6 * canvasWidth + 288, 0.75 * canvasWidth), canvasWidth) * heightRatio +
      'px';
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
   let sound = document.getElementById('sound');
   if (sound.checked) {
      muteAllAudio();
   }
   sound.checked = false;
});

window.addEventListener('orientationchange', () => {
   if (window.innerHeight > window.innerWidth) {
      window.location.reload();
   }
});

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
   world.clearAllIntervals();
   world = null;
   toggleDialog();
   enableKeys();
   init();
}

function muteAllAudio() {
   allAudio.forEach((el) => (el.object.muted = !el.object.muted));
}

function initialBGMStart() {
   let audio = BGM_AUDIO.object;
   audio.play();
   audio.currentTime = 0;
   audio.loop = true;
   audio.volume = 0.25;
}

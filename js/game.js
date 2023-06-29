let world;
let modal;

muteAllAudio();

/**
 * Locks the screen in landscape.
 */
screen.orientation.lock('landscape').catch(() => {
   return;
});

/**
 * Disables button presses on leaving the window.
 */
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

/**
 * Reloads the page on orientationchange.
 */
window.addEventListener('orientationchange', () => {
   if (window.innerHeight > window.innerWidth) {
      window.location.reload();
   }
});

/**
 * Renders the site onload.
 */
function renderSite() {
   modal = document.getElementById('modal');
   modal.parentElement.parentElement.style.height =
      Math.min(Math.max(0.6 * canvasWidth + 288, 0.75 * canvasWidth), canvasWidth) * heightRatio +
      'px';
   prepareMainMenu(true);
}

/**
 * Renders the main menu inside the modal.
 * @param {boolean} state - modal open state
 */
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

/**
 * Initializes the game/world.
 */
function init() {
   prepareMainMenu(false);
   world = new World(level0);
}

/**
 * Initializes the end screen.
 * @param {boolean} state - modal open state
 */
function showEndModal(state) {
   let div = document.getElementById('inside-modal');
   div.innerHTML = checkForWin(state);
   toggleDialog();
}

/**
 * Checks for win and prepares the modal.
 * @param {boolean} state - winning state
 * @returns html string
 */
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

/**
 * Toggles <dialog>.
 */
function toggleDialog() {
   if (!modal.open) {
      modal.showModal();
   } else {
      modal.close();
   }
   modal.classList.toggle('isOpen');
}

/**
 * Resets game to play again.
 */
function resetGame() {
   world.clearAllIntervals();
   world = null;
   toggleDialog();
   enableKeys();
   init();
}

/**
 * Mutes all available audios.
 */
function muteAllAudio() {
   allAudio.forEach((el) => (el.object.muted = !el.object.muted));
}

/**
 * Plays the BGM on enabling audio.
 */
function initialBGMStart() {
   let audio;
   if (world?.enemies[world.enemies.length - 1].hasSeenTheCharacter) {
      audio = BOSS_BGM_AUDIO.object;
   } else {
      audio = BGM_AUDIO.object;
   }
   audio.play();
   audio.currentTime = 0;
   audio.loop = true;
   audio.volume = 0.25;
}

/**
 * Toggles fullscreen of the game.
 */
function toggleFullscreen() {
   let toggle = document.getElementById('fullscreen');
   let screen = document.getElementById('main');
   if (toggle.checked) {
      enterFullscreen(screen);
   } else if (!toggle.checked) {
      exitFullscreen();
   }
}

/**
 * Function to enter fullscreen.
 * @param {element} element - fullscreen element
 */
function enterFullscreen(element) {
   if (element.requestFullscreen) {
      element.requestFullscreen();
   } else if (element.msRequestFullscreen) {
      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
   } else if (element.webkitRequestFullscreen) {
      // iOS Safari
      element.webkitRequestFullscreen();
   }
}

/**
 * Function to end fullscreen mode.
 */
function exitFullscreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
   } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
   }
}

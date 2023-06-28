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

function toggleFullscreen() {
   let toggle = document.getElementById('fullscreen');
   let screen = document.getElementById('main');
   if (toggle.checked) {
      enterFullscreen(screen);
   } else if (!toggle.checked) {
      exitFullscreen();
   }
}

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

function exitFullscreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
   } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
   }
}

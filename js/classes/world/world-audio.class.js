class WorldAudio {
   constructor() {}

   playAudio(variable) {
      let audio = variable.object;
      audio.play();
      audio.volume = variable.volume ?? 1;
      audio.currentTime = variable.time ?? audio.currentTime;
      audio.loop = variable.loop ?? false;
   }

   prepareAudioForModal(bossDown) {
      this.silenceAllBGM();
      setTimeout(() => {
         switch (bossDown) {
            case true:
               this.playAudio(WIN_AUDIO);
               break;
            case false:
               this.playAudio(LOOSE_AUDIO);
               break;
         }
      }, 750);
   }

   silenceAllBGM() {
      this.silenceBGM(BGM_AUDIO, true);
      this.silenceBGM(BOSS_BGM_AUDIO, true);
   }

   silenceBGM(variable, faster) {
      let audio = variable.object;
      let interval = setInterval(
         () => {
            let i = audio.volume;
            i -= 0.01;
            if (i <= 0) {
               clearInterval(interval);
            } else {
               audio.volume = i;
            }
         },
         faster ? 25 : 100
      );
      interval;
   }
}

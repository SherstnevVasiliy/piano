const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const fullScreen = document.querySelector('.fullscreen');
const btnLetters = document.querySelector('.btn-letters');
const btnNotes = document.querySelector('.btn-notes');

piano.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('piano-key')) {
      const note = event.target.dataset.note;
      const src = `assets/audio/${note}.mp3`;
      playAudio(src);
    }   
  });

  function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }

piano.addEventListener('mousedown', (event) => {
  if(event.target.classList.contains('piano-key')) {
    pianoКeys.forEach((el) => {
      if(el.classList.contains('piano-key-active')) {
        el.classList.remove('piano-key-active');
        el.classList.remove('piano-key-active-pseudo');
      }
    });
    event.target.classList.add('piano-key-active');
    event.target.classList.add('piano-key-active-pseudo');
  }
});

window.addEventListener('mouseup', (event) => {
  pianoКeys.forEach((el) => {
      if(el.classList.contains('piano-key-active')) {
        el.classList.remove('piano-key-active');
        el.classList.remove('piano-key-active-pseudo');
      }
      event.target.classList.remove('piano-key-active');
      el.classList.remove('piano-key-active-pseudo');
    });
});

fullScreen.addEventListener('click', (event) => {
  if(event.target.classList.contains('openfullscreen')) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
     } else {
      document.documentElement.requestFullscreen();
     }
  }
})

btnLetters.addEventListener("click", (event) => {
  pianoКeys.forEach((el) => {
    if(!el.classList.contains('piano-key-letter')) {
      el.classList.add('piano-key-letter');
    }
  });
  event.target.classList.add('btn-active')
  btnNotes.classList.remove('btn-active')
})

btnNotes.addEventListener("click", (event) => {
  pianoКeys.forEach((el) => {
    if(el.classList.contains('piano-key-letter')) {
      el.classList.remove('piano-key-letter');
    }
  });
  event.target.classList.add('btn-active')
  btnLetters.classList.remove('btn-active')
})

window.addEventListener('keydown', (event) => {
  const keyobj = {68: 'c', 82: 'c♯', 70: 'd', 84: 'd♯', 71: 'e', 72: 'f', 85: 'f♯', 74: 'g', 73: 'g♯', 75: 'a', 79: 'a♯', 76: 'b'}
    if (keyobj[event.which]) {
    const src = `assets/audio/${keyobj[event.which]}.mp3`;
    playAudio(src);    
  }
});
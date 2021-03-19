const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const fullScreen = document.querySelector('.fullscreen');
const btnLetters = document.querySelector('.btn-letters');
const btnNotes = document.querySelector('.btn-notes');

// Buttons switch block
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

// Mouse works
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
  isMouseDown = false;
  pianoКeys.forEach((el) => {
      if(el.classList.contains('piano-key-active')) {
        el.classList.remove('piano-key-active');
        el.classList.remove('piano-key-active-pseudo');
      }
      event.target.classList.remove('piano-key-active');
      el.classList.remove('piano-key-active-pseudo');
    });
});

// Swipe
let isMouseDown = false;

piano.addEventListener('mousedown', (event) => {
  isMouseDown = true;
    piano.onmouseover = function(event) {
      if (isMouseDown) {
        if(event.target.classList.contains('piano-key')) {
          const note = event.target.dataset.note;
          const src = `assets/audio/${note}.mp3`;
          playAudio(src);
        } 
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
      }
    };
    piano.onmouseout = function(event) {
      pianoКeys.forEach((el) => {
        if(el.classList.contains('piano-key-active')) {
          el.classList.remove('piano-key-active');
          el.classList.remove('piano-key-active-pseudo');
        }
        event.target.classList.remove('piano-key-active');
        el.classList.remove('piano-key-active-pseudo');
      });
    }
});

// Keyboards works

const keyobj = {68: 'c', 82: 'c♯', 70: 'd', 84: 'd♯', 71: 'e', 72: 'f', 85: 'f♯', 74: 'g', 73: 'g♯', 75: 'a', 79: 'a♯', 76: 'b'}
let allowed = true;

window.addEventListener('keydown', (event) => {
  if (event.repeat != undefined) {
    allowed = !event.repeat;
  }
  if (!allowed) return;
    allowed = false;
    event.repeat = false;
    if (keyobj[event.which]) {
    const src = `assets/audio/${keyobj[event.which]}.mp3`;
    playAudio(src);    
  }
});

window.addEventListener('keydown', (event) => {
    pianoКeys.forEach((el) => {
      if(el.dataset.note == keyobj[event.which]) {
        el.classList.add('piano-key-active');
        el.classList.add('piano-key-active-pseudo');
      }
    });
});

window.addEventListener('keyup', (event) => {
  allowed = true;
  pianoКeys.forEach((el) => {
    if(el.dataset.note == keyobj[event.which]) {
      el.classList.remove('piano-key-active');
      el.classList.remove('piano-key-active-pseudo');
    }
  });
});


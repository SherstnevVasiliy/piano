const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');

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
      }
    });
    event.target.classList.add('piano-key-active');
  }
});

window.addEventListener('mouseup', (event) => {
    pianoКeys.forEach((el) => {
        if(el.classList.contains('piano-key-active')) {
          el.classList.remove('piano-key-active');
        }
      });
      event.target.classList.remove('piano-key-active');
  });
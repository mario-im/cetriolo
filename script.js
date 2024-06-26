document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://raw.githubusercontent.com/mario-im/cetriolo/main/cetriolo.json';
  const cucumber = document.getElementById('cucumber');
  const message = document.getElementById('message');
  const countdown = document.querySelector('.counter');
  const nums = document.querySelectorAll('.nums span');
  const countdownBar = document.querySelector('.countdown-bar');
  const countdownFill = document.querySelector('.countdown-fill');

  let phrases = [];
  let originalWidth = cucumber.offsetWidth;
  let originalHeight = cucumber.offsetHeight;
  let isClickable = true;

  // Nascondi la barra al caricamento della pagina
  countdownBar.style.display = 'none';

  // Carica le frasi dal file JSON su GitHub
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      phrases = data.frasi || data.phrases; // assicurati che il JSON contenga le frasi
    })
    .catch(error => {
      console.error('Errore nel caricamento delle frasi:', error);
    });

  cucumber.addEventListener('click', function() {
    if (!isClickable || phrases.length === 0) {
      return;
    }

    isClickable = false;

    // Riduci la dimensione del cetriolo
    const goldenRatio = 1.618;
    cucumber.style.width = (originalWidth / goldenRatio) + 'px';
    cucumber.style.height = (originalHeight / goldenRatio) + 'px';

    const randomIndex = Math.floor(Math.random() * phrases.length);
    message.textContent = phrases[randomIndex];
    message.style.opacity = '1';

    countdownBar.style.display = 'block';
    countdownFill.style.width = '100%';

    let seconds = 7;
    const interval = setInterval(() => {
      seconds--;
      countdownFill.style.width = `${(seconds / 7) * 100}%`;
      if (seconds <= 3 && seconds > 0) {
        countdown.classList.remove('hidden');
        countdown.style.display = 'flex';
        nums.forEach(num => {
          num.classList.remove('in', 'out');
        });
        nums[3 - seconds].classList.add('in');
      }
      if (seconds <= 0) {
        clearInterval(interval);
        resetDOM();
        countdown.style.display = 'none';
        countdownBar.style.display = 'none';
        message.style.opacity = '0';
        cucumber.style.width = originalWidth + 'px';
        cucumber.style.height = originalHeight + 'px';
        isClickable = true;
      }
    }, 1000);
  });

  function resetDOM() {
    countdown.classList.remove('hide');
    nums.forEach(num => {
      num.classList.value = '';
    });

    nums[0].classList.add('in');
  }

  function runAnimation() {
    nums.forEach((num, idx) => {
      const penultimate = nums.length - 1;

      num.addEventListener('animationend', (e) => {
        if (e.animationName === 'goIn' && idx !== penultimate) {
          num.classList.remove('in');
          num.classList.add('out');
          if (num.nextElementSibling) {
            num.nextElementSibling.classList.add('in');
          }
        } else if (e.animationName === 'goOut' && num.nextElementSibling) {
          num.nextElementSibling.classList.add('in');
        } else {
          countdown.classList.add('hide');
        }
      });
    });
  }
});

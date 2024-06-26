document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://raw.githubusercontent.com/mario-im/cetriolo/main/cetriolo.json';
  const cucumber = document.getElementById('cucumber');
  const message = document.getElementById('message');
  const countdown = document.getElementById('countdown');

  let phrases = [];
  let originalWidth = cucumber.offsetWidth;
  let originalHeight = cucumber.offsetHeight;
  let isClickable = true;

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
    countdown.style.display = 'block';

    let seconds = 7;
    const fill = countdown.querySelector('.countdown-fill');
    fill.style.width = '100%';

    const interval = setInterval(() => {
      seconds--;
      fill.style.width = `${(seconds / 7) * 100}%`;
      if (seconds <= 0) {
        clearInterval(interval);
        message.style.opacity = '0';
        countdown.style.display = 'none';

        cucumber.style.width = originalWidth + 'px';
        cucumber.style.height = originalHeight + 'px';

        isClickable = true;
      }
    }, 1000);
  });
});

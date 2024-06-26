// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service worker installing...');
    // Aggiungi assets alla cache qui
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service worker activating...');
    // Pulisci vecchie cache se necessario
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    // Intercetta le richieste e risponde con le cache se necessario
  });
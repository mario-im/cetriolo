document.addEventListener('DOMContentLoaded', function () {
  const faqContainer = document.getElementById('faq-container');

  // Aggiungi la funzione per il bottone "Back"
  document.getElementById('back-button').addEventListener('click', function() {
    window.history.back();
  });

  fetch('https://raw.githubusercontent.com/mario-im/cetriolo/main/FAQ/faq.json')
    .then(response => response.json())
    .then(data => {
      data.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('accordion-item');

        const button = document.createElement('button');
        button.id = `accordion-button-${index + 1}`;
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = `<span class="accordion-title">${faq.title}</span><span class="icon" aria-hidden="true"></span>`;

        const content = document.createElement('div');
        content.classList.add('accordion-content');
        content.innerHTML = `<p>${faq.content}</p>`;

        faqItem.appendChild(button);
        faqItem.appendChild(content);
        faqContainer.appendChild(faqItem);
      });

      const items = document.querySelectorAll(".accordion button");

      function toggleAccordion() {
        const itemToggle = this.getAttribute('aria-expanded');

        for (let i = 0; i < items.length; i++) {
          items[i].setAttribute('aria-expanded', 'false');
        }

        if (itemToggle == 'false') {
          this.setAttribute('aria-expanded', 'true');
        }
      }

      items.forEach(item => item.addEventListener('click', toggleAccordion));
    })
    .catch(error => {
      console.error('Errore nel caricamento delle FAQ:', error);
    });
});
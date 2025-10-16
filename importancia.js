document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO 1: Animação de entrada (Scroll) ---
    // Seleciona todos os cards, incluindo os simples
    const allCards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    allCards.forEach(card => {
        observer.observe(card);
    });


    // --- NOVO CÓDIGO 2: Interação de Virar (Click) ---
    // Seleciona apenas os cards que devem ter o efeito flip
    const flippableCards = document.querySelectorAll('.card:not(.simple-card):not(.full-width)');

    flippableCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardInner = card.querySelector('.card-inner');
            if (cardInner) { // Verifica se o elemento interno existe
                cardInner.classList.toggle('is-flipped');
            }
        });
    });

});
document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 /* Ativa quando 10% do card estiver visível */
    });

    cards.forEach(card => {
        observer.observe(card);
    });

});
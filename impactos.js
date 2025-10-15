document.addEventListener('DOMContentLoaded', () => {

    // --- EFEITO 1: ANIMAÇÃO DOS CARDS AO ROLAR A PÁGINA ---
    const cards = document.querySelectorAll('.card');
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

    cards.forEach(card => {
        observer.observe(card);
    });

    // --- EFEITO 2: LISTAS EXPANSÍVEIS (ACCORDION) ---
    const accordionHeaders = document.querySelectorAll('.card h3');
    accordionHeaders.forEach(header => {
        header.innerHTML += ' <span class="icon">+</span>';
        header.style.cursor = 'pointer';

        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');

            if (content && content.tagName === 'UL') {
                content.classList.toggle('active');
                if (content.classList.contains('active')) {
                    icon.textContent = '-';
                } else {
                    icon.textContent = '+';
                }
            }
        });
    });
});
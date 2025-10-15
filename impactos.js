document.addEventListener('DOMContentLoaded', () => {

    // --- EFEITO 1: ANIMAÇÃO DOS CARDS AO ROLAR A PÁGINA ---

    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Quando o card entrar na tela, adiciona a classe 'visible'
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: para de observar o elemento depois que ele já apareceu
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do card está visível
    });

    // Pede ao observador para "observar" cada um dos cards
    cards.forEach(card => {
        observer.observe(card);
    });


    // --- EFEITO 2: LISTAS EXPANSÍVEIS (ACCORDION) ---

    // Seleciona todos os subtítulos h3 dentro dos cards
    const accordionHeaders = document.querySelectorAll('.card h3');

    accordionHeaders.forEach(header => {
        // Adiciona um ícone de "+" para indicar que é clicável
        header.innerHTML += ' <span class="icon">+</span>';
        header.style.cursor = 'pointer'; // Muda o cursor para indicar que é clicável

        header.addEventListener('click', () => {
            // O conteúdo a ser expandido é a lista <ul> logo após o <h3>
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');

            if (content && content.tagName === 'UL') {
                // Alterna a classe 'active' para mostrar ou esconder o conteúdo
                content.classList.toggle('active');

                // Atualiza o ícone
                if (content.classList.contains('active')) {
                    icon.textContent = '-';
                } else {
                    icon.textContent = '+';
                }
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO 1: Animação de entrada dos cards ao rolar ---
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // O card aparece quando 10% dele está visível
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // --- CÓDIGO 2: Botão de Voltar ao Topo (seu código original) ---
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Mostra o botão após rolar 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- NOVO CÓDIGO 3: Funcionalidade do Accordion ---
    const accordionHeaders = document.querySelectorAll('.card h3');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // A lista <ul> é o próximo elemento depois do <h3>
            const accordionContent = header.nextElementSibling;
            
            // Adiciona ou remove a classe 'active' do título
            header.classList.toggle('active');

            if (header.classList.contains('active')) {
                // Se está ativo, mostra o conteúdo e muda o ícone
                accordionContent.classList.add('active');
                header.querySelector('.icon').textContent = '−'; // Sinal de menos
            } else {
                // Se não está ativo, esconde e volta o ícone
                accordionContent.classList.remove('active');
                header.querySelector('.icon').textContent = '+';
            }
        });
    });

});
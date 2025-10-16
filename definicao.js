// ===== SLIDER FUNCTIONALITY =====

// Selecionando elementos do DOM
const slides = document.querySelectorAll('.slider-card');
const leftArrow = document.querySelector('.slider-arrow.left');
const rightArrow = document.querySelector('.slider-arrow.right');
const dots = document.querySelectorAll('.dot');

// Variáveis de controle
let currentSlideIndex = 0;
const totalSlides = slides.length;

/**
 * Exibe o slide correspondente ao índice fornecido
 * @param {number} index - Índice do slide a ser exibido
 */
function showSlide(index) {
    // Controle de limites (loop circular)
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    // Remove a classe 'active-slide' de todos os slides
    slides.forEach(slide => {
        slide.classList.remove('active-slide');
    });
    
    // Adiciona a classe 'active-slide' ao slide atual
    slides[currentSlideIndex].classList.add('active-slide');

    // Atualiza os dots (indicadores)
    updateDots();
}

/**
 * Atualiza os indicadores (dots) para refletir o slide atual
 */
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/**
 * Avança para o próximo slide
 */
function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

/**
 * Retorna para o slide anterior
 */
function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

// ===== EVENT LISTENERS =====

// Seta esquerda - slide anterior
leftArrow.addEventListener('click', prevSlide);

// Seta direita - próximo slide
rightArrow.addEventListener('click', nextSlide);

// Dots - navegação direta
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Navegação por teclado (acessibilidade)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// ===== AUTO PLAY (OPCIONAL) =====
// Descomente as linhas abaixo para ativar a troca automática de slides

/*
let autoPlayInterval;
const autoPlayDelay = 5000; // 5 segundos

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Inicia o autoplay
startAutoPlay();

// Para o autoplay quando o usuário interage
leftArrow.addEventListener('click', () => {
    stopAutoPlay();
    startAutoPlay();
});

rightArrow.addEventListener('click', () => {
    stopAutoPlay();
    startAutoPlay();
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        stopAutoPlay();
        startAutoPlay();
    });
});
*/

// ===== INICIALIZAÇÃO =====
// Exibe o primeiro slide ao carregar a página
showSlide(currentSlideIndex);

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMAÇÃO DE SCROLL REVEAL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa os cards das camadas para animação de entrada
document.querySelectorAll('.layer-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('🌍 Site sobre Atmosfera carregado com sucesso!');
console.log(`📊 Total de slides: ${totalSlides}`);
// ===== SCROLL REVEAL ANIMATION =====

/**
 * Observa os cards e adiciona animação quando entram na viewport
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Adiciona delay escalonado para cada card
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            
            // Para de observar após a animação
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa todos os cards de clima
const climateCards = document.querySelectorAll('.climate-card');
climateCards.forEach(card => {
    cardObserver.observe(card);
});

// ===== SMOOTH SCROLL =====

/**
 * Adiciona scroll suave para o indicador de scroll no hero
 */
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const introSection = document.querySelector('.intro-section');
        if (introSection) {
            introSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===== PARALLAX EFFECT NO HERO =====

/**
 * Adiciona efeito parallax sutil no hero durante o scroll
 */
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        const scrollIndicator = hero.querySelector('.scroll-indicator');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
        
        if (scrollIndicator) {
            scrollIndicator.style.opacity = 1 - (scrolled / 300);
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===== CARD INTERACTION EFFECTS =====

/**
 * Adiciona efeitos de interação aos cards
 */
climateCards.forEach(card => {
    // Efeito de tilt 3D ao passar o mouse
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
    
    // Adiciona efeito de clique (pulse)
    card.addEventListener('click', function() {
        this.style.animation = 'pulse 0.3s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

// ===== COUNTER ANIMATION PARA ESTATÍSTICAS =====

/**
 * Anima os valores das estatísticas quando ficam visíveis
 */
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.dataset.animated) {
                statValue.dataset.animated = 'true';
                
                // Adiciona uma pequena animação de fade
                statValue.style.animation = 'fadeIn 0.5s ease-in-out';
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statObserver.observe(stat);
});

// ===== FILTER/SEARCH FUNCTIONALITY (OPCIONAL) =====

/**
 * Adiciona funcionalidade de filtro por tipo de clima
 * Esta função pode ser expandida para incluir um campo de busca
 */
function filterClimate(climateType) {
    climateCards.forEach(card => {
        const cardClimate = card.dataset.climate;
        
        if (climateType === 'all' || cardClimate === climateType) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('visible');
            }, 100);
        } else {
            card.style.display = 'none';
            card.classList.remove('visible');
        }
    });
}

// ===== LAZY LOADING DE IMAGENS =====

/**
 * Implementa lazy loading para as imagens dos cards
 */
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Se a imagem tiver um data-src, carrega ela
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            // Adiciona classe de carregada
            img.classList.add('loaded');
            
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('.card-image').forEach(img => {
    imageObserver.observe(img);
});

// ===== ADICIONA ANIMAÇÃO DE PULSE AO CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
    }
    
    .card-image.loaded {
        animation: fadeIn 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// ===== ACCESSIBILITY IMPROVEMENTS =====

/**
 * Adiciona suporte para navegação por teclado
 */
climateCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Clima ${card.querySelector('.card-title').textContent}`);
    
    // Permite ativar o card com Enter ou Space
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// ===== PERFORMANCE MONITORING =====

/**
 * Monitora o desempenho da página (opcional, para desenvolvimento)
 */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log('🌍 Site de Diversidade Climática carregado com sucesso!');
        console.log(`⏱️ Tempo de carregamento: ${pageLoadTime}ms`);
        console.log(`📊 Total de cards: ${climateCards.length}`);
    });
}

// ===== EASTER EGG: CLICK NO TÍTULO =====

/**
 * Adiciona um easter egg ao clicar no título principal
 */
let clickCount = 0;
const heroTitle = document.querySelector('.hero-title');

if (heroTitle) {
    heroTitle.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            heroTitle.style.animation = 'rainbow 2s infinite';
            
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { color: #ff0000; }
                    16% { color: #ff8800; }
                    33% { color: #ffff00; }
                    50% { color: #00ff00; }
                    66% { color: #0088ff; }
                    83% { color: #8800ff; }
                    100% { color: #ff0000; }
                }
            `;
            document.head.appendChild(rainbowStyle);
            
            setTimeout(() => {
                heroTitle.style.animation = '';
                clickCount = 0;
            }, 5000);
        }
    });
}

console.log('✅ JavaScript carregado e pronto!');
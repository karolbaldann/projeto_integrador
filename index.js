// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
    }
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
        navbar.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }
    
    lastScroll = currentScroll;
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe all cards and features
document.querySelectorAll(".topic-card, .feature-card, .stat-item").forEach(el => {
    observer.observe(el);
});

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== STATS COUNTER ANIMATION =====
const statsSection = document.querySelector(".stats-section");
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPercent = text.includes("%");
        const hasKm = text.includes("km");
        const targetValue = parseInt(text.replace(/\D/g, ""));
        
        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            
            let displayValue = Math.floor(currentValue);
            if (hasPercent) {
                stat.textContent = displayValue + "%";
            } else if (hasKm) {
                stat.textContent = displayValue.toLocaleString() + "km";
            } else {
                stat.textContent = displayValue;
            }
        }, stepTime);
    });
    
    statsAnimated = true;
};

// Trigger stats animation when section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== RIPPLE EFFECT ON BUTTONS =====
document.querySelectorAll(".card-btn, .hero-btn").forEach(button => {
    button.addEventListener("click", function(e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== LAZY LOADING IMAGES =====
if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add("loaded");
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll(".card-image").forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = "↑";
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = "1";
        scrollToTopBtn.style.visibility = "visible";
    } else {
        scrollToTopBtn.style.opacity = "0";
        scrollToTopBtn.style.visibility = "hidden";
    }
});

scrollToTopBtn.addEventListener("mouseenter", () => {
    scrollToTopBtn.style.transform = "scale(1.1)";
});

scrollToTopBtn.addEventListener("mouseleave", () => {
    scrollToTopBtn.style.transform = "scale(1)";
});

// ===== PRELOADER (Optional) =====
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// ===== CONSOLE MESSAGE =====
console.log("%c🌍 AtmosferaInfo ", "background: #2563eb; color: white; font-size: 20px; padding: 10px;");
console.log("%cSite desenvolvido com HTML, CSS e JavaScript", "color: #64748b; font-size: 12px;");

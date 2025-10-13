const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slider-card');
const leftArrow = document.querySelector('.slider-arrow.left');
const rightArrow = document.querySelector('.slider-arrow.right');
const dots = document.querySelectorAll('.dot'); 

let currentSlideIndex = 0;
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    slides.forEach(slide => {
        slide.classList.remove('active-slide');
    });
    
    slides[currentSlideIndex].classList.add('active-slide');

    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    if (dots[currentSlideIndex]) {
         dots[currentSlideIndex].classList.add('active');
    }
}

leftArrow.addEventListener('click', () => {
    showSlide(currentSlideIndex - 1);
});

rightArrow.addEventListener('click', () => {
    showSlide(currentSlideIndex + 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

showSlide(currentSlideIndex);
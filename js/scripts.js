/* =====================================================
   SCRIPTS ESPECÍFICOS DE INDEX.HTML
   Funcionalidades únicas de la página principal
   ===================================================== */

// ===== Tabs Paciente/Cuidador =====
const tabPaciente = document.getElementById('tab-paciente');
const tabCuidador = document.getElementById('tab-cuidador');
const cardsPaciente = document.getElementById('cards-paciente');
const cardsCuidador = document.getElementById('cards-cuidador');

if (tabPaciente && tabCuidador) {
    tabPaciente.addEventListener('click', () => {
        tabPaciente.classList.add('active-simple');
        tabCuidador.classList.remove('active-simple');
        cardsPaciente.classList.remove('hidden');
        cardsCuidador.classList.add('hidden');
    });

    tabCuidador.addEventListener('click', () => {
        tabCuidador.classList.add('active-simple');
        tabPaciente.classList.remove('active-simple');
        cardsCuidador.classList.remove('hidden');
        cardsPaciente.classList.add('hidden');
    });
}

// ===== Carousel Mobile para tarjetas con barra de progreso =====
let currentCardIndex = 0;
const cardWrappers = document.querySelectorAll('.mobile-card-wrapper');
const progressBars = [
    document.getElementById('progress-1'),
    document.getElementById('progress-2'),
    document.getElementById('progress-3')
];
const isMobile = () => window.innerWidth < 768;
let carouselInterval;

function resetProgressBar(index) {
    if (progressBars[index]) {
        progressBars[index].classList.remove('animating');
        progressBars[index].style.width = '0%';
        void progressBars[index].offsetWidth;
    }
}

function startProgressBar(index) {
    if (progressBars[index]) {
        resetProgressBar(index);
        setTimeout(() => {
            progressBars[index].classList.add('animating');
        }, 50);
    }
}

function rotateCards() {
    if (isMobile()) {
        cardWrappers[currentCardIndex].classList.remove('active');
        currentCardIndex = (currentCardIndex + 1) % cardWrappers.length;
        cardWrappers[currentCardIndex].classList.add('active');
        startProgressBar(currentCardIndex);
    }
}

function initCarousel() {
    if (isMobile()) {
        startProgressBar(0);
        carouselInterval = setInterval(rotateCards, 4000);
    } else {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    }
}

// ===== Ocultar tarjetas al hacer scroll (solo desktop) =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carousel
    if (cardWrappers.length > 0) {
        initCarousel();
    }
    
    // Ocultar cards en scroll
    if (!isMobile()) {
        const heroSection = document.getElementById('inicio');
        const cardsContainer = document.querySelector('.slide-cards-container');
        
        if (heroSection && cardsContainer) {
            window.addEventListener('scroll', () => {
                if (!isMobile()) {
                    const heroBottom = heroSection.getBoundingClientRect().bottom;
                    
                    if (heroBottom < 0) {
                        cardsContainer.classList.add('hide-on-scroll');
                    } else {
                        cardsContainer.classList.remove('hide-on-scroll');
                    }
                }
            });
        }
    }
});

window.addEventListener('resize', () => {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    if (!isMobile()) {
        cardWrappers.forEach(wrapper => wrapper.classList.remove('active'));
        currentCardIndex = 0;
    } else {
        cardWrappers.forEach((wrapper, index) => {
            wrapper.classList.toggle('active', index === 0);
        });
        currentCardIndex = 0;
        initCarousel();
    }
});

// ===== Selección de Turnos =====
const turnoCards = document.querySelectorAll('.turno-card');
const turnoInfo = document.getElementById('turno-info');
const turnoDetalles = document.getElementById('turno-detalles');

const turnos = {
    'turno-matutino': {
        horario: '6:00 AM - 10:00 AM',
        detalles: 'Turno para personas que prefieren comenzar temprano. Tendrás toda la tarde libre para realizar otras actividades.',
        color: 'blue'
    },
    'turno-medio': {
        horario: '10:00 AM - 2:00 PM',
        detalles: 'Turno perfecto para quienes buscan flexibilidad. Compatible con la mayoría de rutinas laborales y escolares.',
        color: 'orange'
    },
    'turno-tarde': {
        horario: '2:00 PM - 6:00 PM',
        detalles: 'Turno ideal si prefieres aprovechar las mañanas. Perfecto para quienes trabajan en horario matutino.',
        color: 'teal'
    }
};

if (turnoCards.length > 0) {
    turnoCards.forEach(card => {
        card.addEventListener('click', function() {
            turnoCards.forEach(c => {
                c.classList.remove('selected-blue', 'selected-orange', 'selected-teal');
                const check = c.querySelector('.turno-check');
                if (check) check.classList.remove('show');
            });
            
            const turnoId = this.id;
            const turno = turnos[turnoId];
            
            if (turno) {
                this.classList.add(`selected-${turno.color}`);
                const check = this.querySelector('.turno-check');
                if (check) check.classList.add('show');
                
                if (turnoDetalles) {
                    turnoDetalles.textContent = turno.detalles;
                }
                
                if (turnoInfo) {
                    turnoInfo.classList.remove('hidden');
                    turnoInfo.style.opacity = '0';
                    setTimeout(() => {
                        turnoInfo.style.transition = 'opacity 0.5s';
                        turnoInfo.style.opacity = '1';
                    }, 10);
                }
            }
        });
    });
}

// ===== CARRUSEL AUTOMÁTICO DE IMÁGENES EN HORARIOS =====
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

function showSlide(index) {
    if (slides.length === 0) return;
    
    // Remover active de todas las slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Agregar active a la slide actual
    slides[index].classList.add('active');
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function startCarousel() {
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);
    }
}

function stopCarousel() {
    clearInterval(slideInterval);
}

// Iniciar el carrusel cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        startCarousel();
    }
});

// Permitir navegación manual con los indicadores
if (indicators.length > 0) {
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopCarousel();
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
            startCarousel();
        });
    });
}

// Pausar carrusel al hacer hover
const carouselContainer = document.querySelector('.horarios-carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);
}

// ===== Animaciones al hacer scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar las cards de ayuda y turnos
document.addEventListener('DOMContentLoaded', () => {
    const helpCards = document.querySelectorAll('.help-card');
    helpCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    const turnoCardsAnim = document.querySelectorAll('.turno-card');
    turnoCardsAnim.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });
});
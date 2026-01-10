// ===== Menú Mobile =====
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// ===== Tabs Paciente/Cuidador =====
const tabPaciente = document.getElementById('tab-paciente');
const tabCuidador = document.getElementById('tab-cuidador');
const cardsPaciente = document.getElementById('cards-paciente');
const cardsCuidador = document.getElementById('cards-cuidador');

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

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
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

// ===== Ocultar tarjetas al hacer scroll (solo desktop) =====
// ===== Ocultar tarjetas al hacer scroll (solo desktop) =====
document.addEventListener('DOMContentLoaded', function() {
    if (!isMobile()) {
        const heroSection = document.getElementById('inicio');
        const cardsContainer = document.querySelector('.slide-cards-container');
        
        window.addEventListener('scroll', () => {
            if (!isMobile()) {
                const heroBottom = heroSection.getBoundingClientRect().bottom;
                
                // Si la sección hero sale de la vista, ocultar tarjetas
                if (heroBottom < 0) {
                    cardsContainer.classList.add('hide-on-scroll');
                } else {
                    cardsContainer.classList.remove('hide-on-scroll');
                }
            }
        });
    }
});

// ===== Toggle Dark Mode =====
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleLightIconMobile.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleDarkIconMobile.classList.remove('hidden');
}

function toggleTheme() {
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');
    themeToggleDarkIconMobile.classList.toggle('hidden');
    themeToggleLightIconMobile.classList.toggle('hidden');

    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.body.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);
themeToggleBtnMobile.addEventListener('click', toggleTheme);

// ===== Selección de Turnos =====
const turnoCards = document.querySelectorAll('.turno-card');
const turnoInfo = document.getElementById('turno-info');
const turnoDetalles = document.getElementById('turno-detalles');

const turnos = {
    'turno-matutino': {
        horario: '6:00 AM - 10:00 AM',
        detalles: 'El turno matutino es ideal para personas que prefieren comenzar temprano. Tendrás toda la tarde libre para realizar otras actividades.',
        color: 'blue'
    },
    'turno-medio': {
        horario: '10:00 AM - 2:00 PM',
        detalles: 'Horario intermedio perfecto para quienes buscan flexibilidad. Compatible con la mayoría de rutinas laborales y escolares.',
        color: 'orange'
    },
    'turno-tarde': {
        horario: '2:00 PM - 6:00 PM',
        detalles: 'Turno vespertino ideal si prefieres aprovechar las mañanas. Perfecto para quienes trabajan en horario matutino.',
        color: 'teal'
    }
};

turnoCards.forEach(card => {
    card.addEventListener('click', function() {
        turnoCards.forEach(c => {
            c.classList.remove('selected-blue', 'selected-orange', 'selected-teal');
            c.querySelector('.turno-check').classList.remove('show');
        });
        
        const turnoId = this.id;
        const turno = turnos[turnoId];
        
        this.classList.add(`selected-${turno.color}`);
        this.querySelector('.turno-check').classList.add('show');
        
        turnoDetalles.textContent = turno.detalles;
        turnoInfo.classList.remove('hidden');
        
        turnoInfo.style.opacity = '0';
        setTimeout(() => {
            turnoInfo.style.transition = 'opacity 0.5s';
            turnoInfo.style.opacity = '1';
        }, 10);
    });
});
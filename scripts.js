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

// =====================================================
// SELECTOR DE IDIOMA
// =====================================================
const translations = {
    es: {
        // Navegación
        nav_inicio: "Inicio",
        nav_servicios: "Servicios",
        nav_nosotros: "Nosotros",
        nav_horarios: "Horarios",
        nav_contacto: "Contacto",
        btn_agendar: "Agendar Cita",
        
        // Hero
        hero_title: "Todos merecemos una vida plena",
        card1: "Modelo de atención propietario",
        card2: "Innovación digital centrada en el paciente",
        card3: "Verdadera cultura de cuidado - de por vida",
        
        // Hemodiálisis
        hemo_title: "¿Qué es la Hemodiálisis?",
        hemo_subtitle: "Entendiendo tu tratamiento de forma simple y clara",

          hemo_text1: "La hemodiálisis es un tratamiento que filtra tu sangre cuando los riñones no pueden hacerlo de forma natural.",
        hemo_text2: "Durante el tratamiento, una máquina especial elimina los desechos y el exceso de líquido de tu sangre, ayudando a mantener tu cuerpo en equilibrio.",
        hemo_callout: "Es un proceso seguro, cómodo y que te permite llevar una vida normal y activa.",
        hemo_duracion: "Duración: 3-4 horas por sesión",
        hemo_duracion_desc: "Tiempo suficiente para una limpieza completa",
        hemo_frecuencia: "Frecuencia: 3 veces por semana",
        hemo_frecuencia_desc: "Lunes, miércoles y viernes típicamente",
        hemo_comodidad: "Comodidad: Proceso sin dolor",
        hemo_comodidad_desc: "Puedes leer, ver TV o descansar",
        hemo_vida: "Vida activa: Sigue siendo tú",
        hemo_vida_desc: "Trabaja, viaja y disfruta tu vida",
        
        // Ayuda
        help_title: "¿Cómo podemos ayudarte?",
        tab_paciente: "Soy Paciente ▼",

        // Cards Paciente
        help_info_hemo: "Información Hemodiálisis",
        help_agendar: "Agendar Cita",
        help_promociones: "Promociones",
        help_costos: "Costos y Seguros",


        tab_cuidador: "Soy Cuidador ▼",

        help_guia: "Guía para Cuidadores",
        help_apoyo: "Apoyo Psicológico",
        help_nutricion: "Nutrición Familiar",
        help_recursos: "Recursos Descargables",
        
        // Horarios
        horarios_title: "Nuestros Horarios",
        horarios_subtitle: "3 turnos diarios diseñados para adaptarse a tu rutina",
        horarios_label1: "Encuentra tu horario ideal",
        horarios_label2: "Flexibilidad para tu estilo de vida",
        turno_matutino: "Turno Matutino",
        turno_matutino_desc: "Perfecto para madrugadores • Tarde libre para otras actividades",
        turno_medio: "Turno Medio Día",
        turno_medio_desc: "Horario flexible • Ideal para estudiantes y trabajadores",
        turno_tarde: "Turno Tarde",
        turno_tarde_desc: "Mañanas libres • Perfecto para trabajos matutinos",
        turno_info_title: "Turno Seleccionado",
        turno_disponible: "Disponible",
        turno_consultar: "Consultar Disponibilidad",
        info_dudas: "¿Dudas? Contáctanos por WhatsApp o teléfono",
        
        // Contacto
        contacto_title: "Estamos cerca de ti",
        contacto_subtitle: "Tu clínica de hemodiálisis con calidad y calidez humana.",
        contacto_direccion_label: "Dirección",
        contacto_direccion: "Grupo Hospitalario Medens<br>Tula de Allende, Hidalgo",
        contacto_horario_label: "Horario",
        contacto_horario: "24 Horas",
        contacto_telefono_label: "Teléfono",
        contacto_feature1: "Estacionamiento",
        contacto_feature2: "Accesible",
        contacto_feature3: "Zona segura"
    },
    en: {
        // Navegación
        nav_inicio: "Home",
        nav_servicios: "Services",
        nav_nosotros: "About Us",
        nav_horarios: "Schedule",
        nav_contacto: "Contact",
        btn_agendar: "Book Appointment",
        
        // Hero
        hero_title: "Everyone deserves a full life",
        card1: "Proprietary care model",
        card2: "Patient-centered digital innovation",
        card3: "True culture of care - for life",
        
        // Hemodiálisis
        hemo_title: "What is Hemodialysis?",
        hemo_subtitle: "Understanding your treatment in a simple and clear way",

        hemo_text1: "Hemodialysis is a treatment that filters your blood when the kidneys cannot do it naturally.",
        hemo_text2: "During treatment, a special machine removes waste and excess fluid from your blood, helping to keep your body in balance.",
        hemo_callout: "It is a safe, comfortable process that allows you to lead a normal and active life.",
        hemo_duracion: "Duration: 3-4 hours per session",
        hemo_duracion_desc: "Enough time for a complete cleaning",
        hemo_frecuencia: "Frequency: 3 times per week",
        hemo_frecuencia_desc: "Typically Monday, Wednesday and Friday",
        hemo_comodidad: "Comfort: Painless process",
        hemo_comodidad_desc: "You can read, watch TV or rest",
        hemo_vida: "Active life: Keep being you",
        hemo_vida_desc: "Work, travel and enjoy your life",
        
        // Ayuda
        help_title: "How can we help you?",
        tab_paciente: "I'm a Patient ▼",

        help_info_hemo: "Hemodialysis Information",
        help_agendar: "Book Appointment",
        help_promociones: "Promotions",
        help_costos: "Costs and Insurance",

        tab_cuidador: "I'm a Caregiver ▼",
        // Cards Cuidador - FALTANTES
        help_guia: "Caregiver Guide",
        help_apoyo: "Psychological Support",
        help_nutricion: "Family Nutrition",
        help_recursos: "Downloadable Resources",
        // Horarios
        horarios_title: "Our Schedule",
        horarios_subtitle: "3 daily shifts designed to fit your routine",
         // Horarios - FALTANTES
        horarios_label1: "Find your ideal schedule",
        horarios_label2: "Flexibility for your lifestyle",
        turno_matutino: "Morning Shift",
        turno_matutino_desc: "Perfect for early risers • Free afternoon for other activities",
        turno_medio: "Midday Shift",
        turno_medio_desc: "Flexible schedule • Ideal for students and workers",
        turno_tarde: "Afternoon Shift",
        turno_tarde_desc: "Free mornings • Perfect for morning jobs",
        turno_info_title: "Selected Shift",
        turno_disponible: "Available",
        turno_consultar: "Check Availability",
        info_dudas: "Questions? Contact us via WhatsApp or phone",
        // Contacto
        contacto_title: "We are close to you",
        contacto_subtitle: "Your hemodialysis clinic with quality and human warmth.",
         contacto_direccion_label: "Address",
        contacto_direccion: "Grupo Hospitalario Medens<br>Tula de Allende, Hidalgo",
        contacto_horario_label: "Schedule",
        contacto_horario: "24 Hours",
        contacto_telefono_label: "Phone",
        contacto_feature1: "Parking",
        contacto_feature2: "Accessible",
        contacto_feature3: "Safe area"
    }
};

// Inicializar idioma
let currentLang = localStorage.getItem('language') || 'es';

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Actualizar flag
    document.getElementById('current-flag').textContent = lang === 'es' ? '🇲🇽' : '🇺🇸';
    document.getElementById('current-flag-mobile').textContent = lang === 'es' ? '🇲🇽' : '🇺🇸';
    
    // Actualizar activos
    document.querySelectorAll('.language-option, .language-option-mobile').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    
    // Aplicar traducciones
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Cerrar dropdowns
    document.getElementById('language-dropdown').classList.add('hidden');
    document.getElementById('language-dropdown-mobile').classList.add('hidden');
}

// Event listeners
document.getElementById('language-toggle').addEventListener('click', () => {
    document.getElementById('language-dropdown').classList.toggle('hidden');
});

document.getElementById('language-toggle-mobile').addEventListener('click', () => {
    document.getElementById('language-dropdown-mobile').classList.toggle('hidden');
});

document.querySelectorAll('.language-option, .language-option-mobile').forEach(btn => {
    btn.addEventListener('click', (e) => {
        changeLanguage(e.currentTarget.dataset.lang);
    });
});

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        document.getElementById('language-dropdown').classList.add('hidden');
        document.getElementById('language-dropdown-mobile').classList.add('hidden');
    }
});

// Cargar idioma guardado
changeLanguage(currentLang);
/* =====================================================
   MEDENS - SISTEMA GLOBAL DE NAVEGACIÓN Y CONFIGURACIÓN
   Autor: Sistema MEDENS
   Descripción: Maneja navegación, tema oscuro y traducciones
   ===================================================== */

// ==================== CONFIGURACIÓN GLOBAL ====================
const MedensApp = {
    currentLang: 'es',
    currentTheme: 'light',
    
    init() {
        this.initTheme();
        this.initLanguage();
        this.initMobileMenu();
        this.initScrollBehavior();
    },

    // ==================== TEMA OSCURO ====================
    initTheme() {
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('medens-theme') || 'light';
        this.currentTheme = savedTheme;
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
        }
        
        this.updateThemeIcons();
        this.attachThemeListeners();
    },

    toggleTheme() {
        document.body.classList.toggle('dark');
        this.currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('medens-theme', this.currentTheme);
        this.updateThemeIcons();
    },

    updateThemeIcons() {
        const isDark = this.currentTheme === 'dark';
        
        // Desktop
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        
        if (darkIcon && lightIcon) {
            if (isDark) {
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
            } else {
                darkIcon.classList.add('hidden');
                lightIcon.classList.remove('hidden');
            }
        }
        
        // Mobile
        const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
        const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');
        
        if (darkIconMobile && lightIconMobile) {
            if (isDark) {
                darkIconMobile.classList.remove('hidden');
                lightIconMobile.classList.add('hidden');
            } else {
                darkIconMobile.classList.add('hidden');
                lightIconMobile.classList.remove('hidden');
            }
        }
    },

    attachThemeListeners() {
        // Desktop theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Mobile theme toggle
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', () => this.toggleTheme());
        }
    },

    // ==================== IDIOMA ====================
    initLanguage() {
        // Cargar idioma guardado
        const savedLang = localStorage.getItem('medens-language') || 'es';
        this.currentLang = savedLang;
        
        this.updateLanguageFlag();
        this.attachLanguageListeners();
        this.translatePage(savedLang);
    },

    changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('medens-language', lang);
        this.updateLanguageFlag();
        this.translatePage(lang);
        this.closeLanguageDropdowns();
    },

    updateLanguageFlag() {
        const flag = this.currentLang === 'es' ? '🇲🇽' : '🇺🇸';
        
        // Desktop
        const currentFlag = document.getElementById('current-flag');
        if (currentFlag) {
            currentFlag.textContent = flag;
        }
        
        // Mobile
        const currentFlagMobile = document.getElementById('current-flag-mobile');
        if (currentFlagMobile) {
            currentFlagMobile.textContent = flag;
        }
        
        // Actualizar opciones activas
        document.querySelectorAll('.language-option, .language-option-mobile').forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    attachLanguageListeners() {
        // Desktop language toggle
        const langToggle = document.getElementById('language-toggle');
        const langDropdown = document.getElementById('language-dropdown');
        
        if (langToggle && langDropdown) {
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('hidden');
            });
        }
        
        // Mobile language toggle
        const langToggleMobile = document.getElementById('language-toggle-mobile');
        const langDropdownMobile = document.getElementById('language-dropdown-mobile');
        
        if (langToggleMobile && langDropdownMobile) {
            langToggleMobile.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdownMobile.classList.toggle('hidden');
            });
        }
        
        // Desktop language options
        document.querySelectorAll('.language-option').forEach(btn => {
            btn.addEventListener('click', () => {
                this.changeLanguage(btn.dataset.lang);
            });
        });
        
        // Mobile language options
        document.querySelectorAll('.language-option-mobile').forEach(btn => {
            btn.addEventListener('click', () => {
                this.changeLanguage(btn.dataset.lang);
            });
        });
        
        // Cerrar dropdowns al hacer click fuera
        document.addEventListener('click', () => {
            this.closeLanguageDropdowns();
        });
    },

    closeLanguageDropdowns() {
        const dropdowns = document.querySelectorAll('.language-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
    },

    translatePage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[lang]?.[key];
            
            if (translation) {
                // Para botones e inputs
                if (element.tagName === 'BUTTON' || element.tagName === 'INPUT') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    },

    // Diccionario de traducciones
    translations: {
        es: {
            // Navegación
            nav_inicio: 'Inicio',
            nav_servicios: 'Servicios',
            nav_nosotros: 'Nosotros',
            nav_horarios: 'Horarios',
            nav_contacto: 'Contacto',
            btn_agendar: 'Agendar Cita',
            
            // Títulos comunes
            titulo_promociones: 'Promociones Especiales',
            titulo_hemodialisis: 'Información sobre Hemodiálisis',
            titulo_cuidadores: 'Guía para Cuidadores',
            titulo_apoyo: 'Apoyo Psicológico',
            
            // Botones comunes
            btn_contactar: 'Contactar',
            btn_mas_info: 'Más Información',
            btn_llamar: 'Llamar Ahora',
            btn_whatsapp: 'WhatsApp',
            
            // Footer
            footer_derechos: 'Todos los derechos reservados',
            footer_privacidad: 'Política de Privacidad',
            footer_terminos: 'Términos y Condiciones'
        },
        en: {
            // Navigation
            nav_inicio: 'Home',
            nav_servicios: 'Services',
            nav_nosotros: 'About Us',
            nav_horarios: 'Schedule',
            nav_contacto: 'Contact',
            btn_agendar: 'Book Appointment',
            
            // Common titles
            titulo_promociones: 'Special Promotions',
            titulo_hemodialisis: 'Hemodialysis Information',
            titulo_cuidadores: 'Caregiver Guide',
            titulo_apoyo: 'Psychological Support',
            
            // Common buttons
            btn_contactar: 'Contact',
            btn_mas_info: 'More Information',
            btn_llamar: 'Call Now',
            btn_whatsapp: 'WhatsApp',
            
            // Footer
            footer_derechos: 'All rights reserved',
            footer_privacidad: 'Privacy Policy',
            footer_terminos: 'Terms and Conditions'
        }
    },

    // ==================== MENÚ MÓVIL ====================
    initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Cerrar menú al hacer click en un enlace
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    },

    // ==================== SCROLL BEHAVIOR ====================
    initScrollBehavior() {
        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Solo aplicar smooth scroll si es un ancla válida
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Cerrar menú móvil al hacer scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (Math.abs(scrollTop - lastScrollTop) > 100) {
                    mobileMenu.classList.add('hidden');
                }
                lastScrollTop = scrollTop;
            }
        });
    }
};

// ==================== INICIALIZACIÓN ====================
// Esperar a que el navbar esté cargado antes de inicializar
function initWhenReady() {
    // Si el navbar ya está cargado dinámicamente, esperar al evento
    if (document.getElementById('navbar-placeholder')) {
        document.addEventListener('navbarLoaded', () => {
            MedensApp.init();
        });
    } else {
        // Si el navbar está en el HTML directamente, inicializar normalmente
        MedensApp.init();
    }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
} else {
    initWhenReady();
}

// Exportar para uso global
window.MedensApp = MedensApp;
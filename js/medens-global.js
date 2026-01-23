/* =====================================================
   MEDENS - FUNCIONALIDAD GLOBAL
   ===================================================== */

const MedensApp = {
    translations: window.MedensTranslations || {},
    currentLang: localStorage.getItem('medens-language') || 'es',
    currentTheme: localStorage.getItem('medens-theme') || 'light',

    // ==================== TEMA OSCURO ====================
    initTheme() {
        // Aplicar tema guardado
        if (this.currentTheme === 'dark') {
            document.body.classList.add('dark');
        }
        
        // Esperar a que el navbar esté cargado
        document.addEventListener('navbarLoaded', () => {
            this.updateThemeIcons();
            this.setupThemeToggle();
        });
    },

    updateThemeIcons() {
        const isDark = document.body.classList.contains('dark');
        
        // Desktop
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        
        // Mobile
        const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
        const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');
        
        if (isDark) {
            darkIcon?.classList.add('hidden');
            lightIcon?.classList.remove('hidden');
            darkIconMobile?.classList.add('hidden');
            lightIconMobile?.classList.remove('hidden');
        } else {
            darkIcon?.classList.remove('hidden');
            lightIcon?.classList.add('hidden');
            darkIconMobile?.classList.remove('hidden');
            lightIconMobile?.classList.add('hidden');
        }
    },

    setupThemeToggle() {
        // Desktop
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Mobile
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', () => this.toggleTheme());
        }
    },

    toggleTheme() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        this.currentTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('medens-theme', this.currentTheme);
        this.updateThemeIcons();
    },

    // ==================== SELECTOR DE IDIOMA ====================
    initLanguage() {
        document.addEventListener('navbarLoaded', () => {
            this.setupLanguageToggle();
            this.updateLanguageUI();
            this.translatePage();
        });
    },

    setupLanguageToggle() {
        // Desktop
        const langToggle = document.getElementById('language-toggle');
        const langDropdown = document.getElementById('language-dropdown');
        
        if (langToggle && langDropdown) {
            // Toggle dropdown
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('hidden');
            });
            
            // Opciones de idioma
            const options = langDropdown.querySelectorAll('.language-option');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.dataset.lang;
                    this.changeLanguage(lang);
                    langDropdown.classList.add('hidden');
                });
            });
        }
        
        // Mobile
        const langToggleMobile = document.getElementById('language-toggle-mobile');
        const langDropdownMobile = document.getElementById('language-dropdown-mobile');
        
        if (langToggleMobile && langDropdownMobile) {
            // Toggle dropdown
            langToggleMobile.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdownMobile.classList.toggle('hidden');
            });
            
            // Opciones de idioma
            const optionsMobile = langDropdownMobile.querySelectorAll('.language-option-mobile');
            optionsMobile.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.dataset.lang;
                    this.changeLanguage(lang);
                    langDropdownMobile.classList.add('hidden');
                });
            });
        }
        
        // Cerrar dropdowns al hacer click fuera
        document.addEventListener('click', () => {
            langDropdown?.classList.add('hidden');
            langDropdownMobile?.classList.add('hidden');
        });
    },

    changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('medens-language', lang);
        this.updateLanguageUI();
        this.translatePage();
    },

    updateLanguageUI() {
        // Actualizar botón desktop
        const langToggle = document.getElementById('language-toggle');
        if (langToggle) {
            langToggle.textContent = this.currentLang === 'es' ? 'MX' : 'US';
        }
        
        // Actualizar opciones activas
        document.querySelectorAll('.language-option, .language-option-mobile').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === this.currentLang);
        });
    },

    translatePage() {
    if (!this.translations) return;
    
    // Traducir elementos con data-translate
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (this.translations[key] && this.translations[key][this.currentLang]) {
            element.textContent = this.translations[key][this.currentLang];
        }
    });
    
    // Traducir placeholders de inputs y textareas
    const placeholderElements = document.querySelectorAll('[data-placeholder-key]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-placeholder-key');
        if (this.translations[key] && this.translations[key][this.currentLang]) {
            element.placeholder = this.translations[key][this.currentLang];
        }
    });
},
    

    // ==================== MENÚ MOBILE ====================
   // ==================== MENÚ MOBILE ====================
initMobileMenu() {
      console.log('📱 initMobileMenu ejecutado');
    document.addEventListener('navbarLoaded', () => {
        console.log('✅ Navbar cargado, buscando elementos...');
        
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        console.log('🔍 Botón:', mobileMenuButton);
        console.log('🔍 Menú:', mobileMenu);
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🎯 Click en menú móvil');
                mobileMenu.classList.toggle('hidden');
            });
            
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        } else {
            console.error('❌ Elementos no encontrados');
        }
    });
},

    // ==================== SMOOTH SCROLL ====================
    initSmoothScroll() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    },

    // ==================== INICIALIZACIÓN ====================
    init() {
       
    this.initTheme();
    this.initLanguage();
    this.initMobileMenu();  // ← ¿ESTÁ ESTA LÍNEA?
    this.initSmoothScroll();
    
}
};

// Inicializar ANTES de que cargue el DOM
MedensApp.init();
window.MedensApp = MedensApp;

/* =====================================================
   MEDENS - SISTEMA DE COMPONENTES COMPARTIDOS
   ===================================================== */

const MedensComponents = {
    getBasePath() {
        const isInPages = window.location.pathname.includes('/pages/');
        return isInPages ? '../' : '';
    },

    getNavbarHTML() {
        const basePath = this.getBasePath();
        
        return `
        <nav>
            <div class="nav-container">
                <div class="nav-content">
                    <!-- Logo -->
                    <div class="logo-container">
                        <a href="${basePath}index.html">
                            <img src="${basePath}images/logoMEDENS.png" alt="MEDENS Logo" class="logo">
                        </a>
                    </div>
                    
                    <!-- Menú Desktop -->
                    <div class="menu-desktop">
                        <a href="${basePath}index.html#inicio" data-translate="nav_inicio">Inicio</a>
                        <a href="${basePath}index.html#section-help" data-translate="nav_servicios">Ayuda</a>
                        <a href="${basePath}index.html#por-que-elegirnos" data-translate="nav_nosotros">¿Por qué elegirnos?</a>
                        <a href="${basePath}index.html#horarios" data-translate="nav_horarios">Horarios</a>
                        <a href="${basePath}index.html#contacto" data-translate="nav_contacto">Contacto</a>
                        
                        <a href="${basePath}pages/agendar-cita.html" class="btn-agendar" data-translate="btn_agendar">Agendar Cita</a>
                        
                        <!-- Toggle de tema -->
                        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Cambiar tema">
                            <svg id="theme-toggle-dark-icon" class="hidden" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                            <svg id="theme-toggle-light-icon" class="hidden" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                        </button>

                        <!-- Selector de Idioma Desktop -->
                        <div class="language-selector">
                            <button id="language-toggle" class="language-toggle-btn" aria-label="Cambiar idioma">
                                MX
                            </button>
                            <div id="language-dropdown" class="language-dropdown hidden">
                                <button data-lang="es" class="language-option active">MX</button>
                                <button data-lang="en" class="language-option">US</button>
                            </div>
                        </div>
                    </div>

                    <!-- Menú Mobile (botones) -->
                    <div class="menu-mobile-buttons">
                        <button id="theme-toggle-mobile" class="theme-toggle-btn" aria-label="Cambiar tema">
                            <svg id="theme-toggle-dark-icon-mobile" class="hidden" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                            <svg id="theme-toggle-light-icon-mobile" class="hidden" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                        </button>

                        <!-- Selector de Idioma Mobile -->
                        <div class="language-selector">
                            <button id="language-toggle-mobile" class="language-toggle-btn" aria-label="Cambiar idioma">
                                MX
                            </button>
                            <div id="language-dropdown-mobile" class="language-dropdown hidden">
                                <button data-lang="es" class="language-option-mobile active">🇲🇽 MX</button>
                                <button data-lang="en" class="language-option-mobile">🇺🇸 US</button>
                            </div>
                        </div>

                        <button id="mobile-menu-button" class="mobile-menu-btn" aria-label="Menú">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Menú Mobile (desplegable) -->
            <div id="mobile-menu" class="mobile-menu hidden">
                <div class="mobile-menu-content">
                    <a href="${basePath}index.html#inicio" data-translate="nav_inicio">Inicio</a>
                    <a href="${basePath}index.html#section-help" data-translate="nav_servicios">Ayuda</a>
                    <a href="${basePath}index.html#por-que-elegirnos" data-translate="nav_nosotros">¿Por qué elegirnos?</a>
                    <a href="${basePath}index.html#horarios" data-translate="nav_horarios">Horarios</a>
                    <a href="${basePath}index.html#contacto" data-translate="nav_contacto">Contacto</a>
                    <a href="${basePath}pages/agendar-cita.html" class="btn-agendar" data-translate="btn_agendar">Agendar Cita</a>
                </div>
            </div>
        </nav>
        `;
    },

    injectNavbar() {
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = this.getNavbarHTML();
        } else {
            document.body.insertAdjacentHTML('afterbegin', this.getNavbarHTML());
        }
    },

    init() {
         this.injectNavbar();
    console.log('🚀 Navbar inyectado');
    // Esperar un tick para que los listeners se registren
    setTimeout(() => {
        document.dispatchEvent(new Event('navbarLoaded'));
        console.log('📢 Evento navbarLoaded disparado');
    }, 0);
    }
};

// Ejecutar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MedensComponents.init());
} else {
    MedensComponents.init();
}

window.MedensComponents = MedensComponents;
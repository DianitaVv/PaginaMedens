/* =====================================================
   RECURSOS DESCARGABLES - FUNCIONALIDAD
   ===================================================== */

// ==================== FILTROS DE CATEGORÍAS ====================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceItems = document.querySelectorAll('.resource-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Actualizar botones activos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar recursos con animación
                resourceItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'flex';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Scroll suave a la sección de recursos
                const resourcesGrid = document.querySelector('.resources-grid');
                if (resourcesGrid) {
                    resourcesGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }
    
    // Inicializar animación de entrada
    resourceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.3s, transform 0.3s';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// ==================== FUNCIÓN DE DESCARGA ====================
function downloadResource(filename) {
    // Mostrar notificación de descarga
    showNotification(`Descargando ${filename}...`);
    
    // Aquí iría la lógica real de descarga
    // Por ahora, simulamos la descarga
    console.log(`Descargando: ${filename}`);
    
    // Simular descarga (en producción, esto sería un enlace real al PDF)
    setTimeout(() => {
        showNotification(`✓ ${filename} descargado correctamente`, 'success');
    }, 1000);
    
    // En producción, usarías algo como:
    // window.location.href = `/recursos/${filename}`;
    // o
    // const link = document.createElement('a');
    // link.href = `/recursos/${filename}`;
    // link.download = filename;
    // link.click();
}

// ==================== FUNCIÓN DE VISTA PREVIA ====================
function previewResource(filename) {
    // Mostrar notificación
    showNotification(`Abriendo vista previa de ${filename}...`);
    
    console.log(`Vista previa: ${filename}`);
    
    // En producción, esto abriría el PDF en una nueva ventana o modal
    // window.open(`/recursos/${filename}`, '_blank');
    
    // Por ahora, simulamos
    setTimeout(() => {
        alert(`Vista previa de ${filename}\n\nEn producción, esto abriría el PDF en un visor.`);
    }, 500);
}

// ==================== SISTEMA DE NOTIFICACIONES ====================
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 6rem;
        right: 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        max-width: 20rem;
    `;
    
    // Agregar al body
    document.body.appendChild(notification);
    
    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ==================== CONTADOR DE DESCARGAS (opcional) ====================
let downloadCount = 0;

function trackDownload(filename) {
    downloadCount++;
    console.log(`Total de descargas en esta sesión: ${downloadCount}`);
    
    // Aquí podrías enviar analytics a tu servidor
    // fetch('/api/track-download', {
    //     method: 'POST',
    //     body: JSON.stringify({ filename, timestamp: new Date() })
    // });
}

// ==================== BÚSQUEDA (opcional - para futuro) ====================
function initSearchFunctionality() {
    const searchInput = document.getElementById('resource-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const resourceItems = document.querySelectorAll('.resource-item');
            
            resourceItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Inicializar búsqueda si existe el input
document.addEventListener('DOMContentLoaded', initSearchFunctionality);

// ==================== ANIMACIONES AL SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observar secciones para animación
    const sections = document.querySelectorAll('.intro-section, .categories-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s, transform 0.6s';
        fadeInObserver.observe(section);
    });
});
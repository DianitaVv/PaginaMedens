/* =====================================================
   VISOR INTERACTIVO DE TRÍPTICO
   ===================================================== */

// Configurar PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Variables globales
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.0; // Escala base - el auto-scaling ajustará al contenedor
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

// ==================== ABRIR MODAL ====================
function openTripticoViewer() {
    const modal = document.getElementById('triptico-viewer-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    
    // Cargar el PDF
    loadPDF();
}

// ==================== CERRAR MODAL ====================
function closeTripticoViewer() {
    const modal = document.getElementById('triptico-viewer-modal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll del body
    
    // Resetear variables
    pageNum = 1;
    scale = 1.0;
    updateZoomDisplay();
}

// Cerrar modal al hacer click fuera del contenido
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('triptico-viewer-modal');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTripticoViewer();
            }
        });
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeTripticoViewer();
        }
        
        // Navegación con flechas
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                previousPage();
            } else if (e.key === 'ArrowRight') {
                nextPage();
            }
        }
    });
});

// ==================== CARGAR PDF ====================
function loadPDF() {
    const pdfPath = '../resources/TripticoInicioTratamiento.pdf';
    
    pdfjsLib.getDocument(pdfPath).promise.then(function(pdf) {
        pdfDoc = pdf;
        document.getElementById('page-count').textContent = pdf.numPages;
        
        // Renderizar primera página
        renderPage(pageNum);
        
        // Actualizar controles
        updateControls();
    }).catch(function(error) {
        console.error('Error cargando PDF:', error);
        showNotification('Error al cargar el tríptico. Por favor, intenta de nuevo.', 'error');
    });
}

// ==================== RENDERIZAR PÁGINA ====================
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        // Obtener el tamaño del contenedor
        const container = document.querySelector('.triptico-viewer');
        const containerWidth = container.clientWidth - 40; // 40px para padding
        const containerHeight = container.clientHeight - 40;
        
        // Calcular escala para que se ajuste al contenedor
        const viewport = page.getViewport({ scale: 1 });
        const scaleX = containerWidth / viewport.width;
        const scaleY = containerHeight / viewport.height;
        
        // Usar la escala más pequeña para que quepa completo
        const autoScale = Math.min(scaleX, scaleY);
        const finalScale = autoScale * scale;
        
        const scaledViewport = page.getViewport({ scale: finalScale });
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport
        };
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(function() {
            pageRendering = false;
            
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    // Actualizar contador de página
    document.getElementById('page-num').textContent = num;
}

// ==================== QUEUE RENDERING ====================
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// ==================== NAVEGACIÓN ====================
function previousPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
    updateControls();
    
    // Animación de transición
    animatePageTransition('left');
}

function nextPage() {
    if (pdfDoc === null || pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
    updateControls();
    
    // Animación de transición
    animatePageTransition('right');
}

// ==================== ACTUALIZAR CONTROLES ====================
function updateControls() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn && nextBtn) {
        prevBtn.disabled = pageNum <= 1;
        nextBtn.disabled = pdfDoc === null || pageNum >= pdfDoc.numPages;
    }
}

// ==================== ZOOM ====================
function zoomIn() {
    if (scale >= 3) return; // Límite máximo de zoom
    
    scale += 0.25;
    updateZoomDisplay();
    queueRenderPage(pageNum);
}

function zoomOut() {
    if (scale <= 0.5) return; // Límite mínimo de zoom
    
    scale -= 0.25;
    updateZoomDisplay();
    queueRenderPage(pageNum);
}

function updateZoomDisplay() {
    const zoomLevel = document.getElementById('zoom-level');
    if (zoomLevel) {
        zoomLevel.textContent = Math.round(scale * 100) + '%';
    }
}

// ==================== ANIMACIÓN DE TRANSICIÓN ====================
function animatePageTransition(direction) {
    const canvasElement = document.getElementById('pdf-canvas');
    
    if (direction === 'right') {
        canvasElement.style.animation = 'slideInRight 0.3s ease';
    } else {
        canvasElement.style.animation = 'slideInLeft 0.3s ease';
    }
    
    setTimeout(() => {
        canvasElement.style.animation = '';
    }, 300);
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ==================== NOTIFICACIONES ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 6rem;
        right: 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : type === 'error' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 99999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        max-width: 20rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Agregar estilos de notificación
const notifStyle = document.createElement('style');
notifStyle.textContent = `
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
document.head.appendChild(notifStyle);

// ==================== CONTROLES TÁCTILES (MOBILE) ====================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const viewer = document.querySelector('.triptico-viewer');
    
    if (viewer) {
        viewer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        viewer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - siguiente página
        nextPage();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - página anterior
        previousPage();
    }
}

// ==================== AJUSTAR ZOOM SEGÚN PANTALLA ====================
function adjustInitialScale() {
    const screenWidth = window.innerWidth;
    
    // Para formato vertical (1089x1543), usar escala base de 1.0
    // El auto-scaling en renderPage() ajustará automáticamente
    if (screenWidth < 768) {
        scale = 1.0; // Móvil - se verá completo
    } else if (screenWidth < 1024) {
        scale = 1.0; // Tablet - se verá completo
    } else {
        scale = 1.0; // Desktop - se verá completo
    }
    
    updateZoomDisplay();
}

// Ajustar escala inicial al abrir
document.addEventListener('DOMContentLoaded', function() {
    adjustInitialScale();
});

// Reajustar si cambia el tamaño de ventana mientras está abierto
window.addEventListener('resize', function() {
    const modal = document.getElementById('triptico-viewer-modal');
    if (modal && modal.classList.contains('active')) {
        adjustInitialScale();
        if (pdfDoc) {
            queueRenderPage(pageNum);
        }
    }
});
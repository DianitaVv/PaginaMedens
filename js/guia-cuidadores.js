// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Cerrar todos los acordeones
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        // Accordion functionality
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Cerrar todos los acordeones
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir el clickeado si no estaba activo
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// Abrir el primer acordeón por defecto
document.addEventListener('DOMContentLoaded', () => {
    const firstAccordion = document.querySelector('.accordion-item');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
    }
});
        // Abrir el clickeado si no estaba activo
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// Abrir el primer acordeón por defecto
document.addEventListener('DOMContentLoaded', () => {
    const firstAccordion = document.querySelector('.accordion-item');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
    }
});
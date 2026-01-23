const EMAILJS_CONFIG = {
    publicKey: '73WxXZQI-pmV9W5pr',  // Reemplazar
    serviceID: 'service_b43dfpa',   // Reemplazar
    templateID: 'template_p8vzdm2'  // Reemplazar
};

// ==================== INICIALIZAR EMAILJS ====================
(function() {
    emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey,
    });
})();

// ==================== VALIDACIÓN Y ENVÍO DEL FORMULARIO ====================
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener el botón de envío
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span>Enviando...</span>
        <svg class="animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
    `;
    
    // Preparar los datos del formulario
    const formData = {
        consultaType: document.getElementById('consultaType').value,
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        fecha: document.getElementById('fecha').value,
        horario: document.getElementById('horario').value,
        mensaje: document.getElementById('mensaje').value || 'Sin mensaje adicional',
        // Datos adicionales útiles
        fechaEnvio: new Date().toLocaleString('es-MX'),
        consultaTypeText: getConsultaTypeText(document.getElementById('consultaType').value),
        horarioText: getHorarioText(document.getElementById('horario').value)
    };
    
    // Enviar email usando EmailJS
    emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.templateID,
        formData
    )
    .then(function(response) {
        console.log('Email enviado exitosamente:', response);
        
        // Mostrar modal de éxito
        document.getElementById('successModal').classList.remove('hidden');
        
        // Resetear formulario
        document.getElementById('appointmentForm').reset();
        
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
    }, function(error) {
        console.error('Error al enviar email:', error);
        
        // Mostrar error al usuario
        alert('Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo o contáctanos por teléfono.');
        
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
});

// ==================== FUNCIONES AUXILIARES ====================
function getConsultaTypeText(value) {
    const tipos = {
        'primera-vez': 'Primera vez / Consulta inicial',
        'informacion': 'Información sobre tratamiento',
        'valoracion': 'Valoración médica',
        'costos': 'Información de costos'
    };
    return tipos[value] || value;
}

function getHorarioText(value) {
    const horarios = {
        'matutino': 'Matutino (6AM - 10AM)',
        'medio': 'Medio día (10AM - 2PM)',
        'tarde': 'Tarde (2PM - 6PM)'
    };
    return horarios[value] || value;
}

// ==================== DESCRIPCIONES DE TIPOS DE CONSULTA ====================
const consultaDescriptions = {
    'primera-vez': {
        title: 'Primera vez / Consulta inicial',
        description: 'Realizaremos una evaluación completa de tu estado de salud, revisaremos tus estudios médicos y te explicaremos el tratamiento de hemodiálisis de manera personalizada.',
        duration: '60 minutos aprox.',
        icon: ''
    },
    'informacion': {
        title: 'Información sobre tratamiento',
        description: 'Te explicaremos cómo funciona la hemodiálisis, qué esperar durante las sesiones, costos, seguros aceptados y resolveremos todas tus dudas.',
        duration: '30 minutos aprox.',
        icon: ''
    },

    'valoracion': {
        title: 'Valoración médica',
        description: 'Un nefrólogo evaluará tu condición actual, revisará resultados de laboratorio recientes y determinará el mejor plan de tratamiento para tu caso específico.',
        duration: '45 minutos aprox.',
        icon: ''
    },
    'costos': {
        title: 'Información de costos',
        description: 'Te explicaremos nuestros planes de pago, paquetes disponibles, descuentos, opciones de financiamiento y seguros médicos que aceptamos.',
        duration: '20 minutos aprox.',
        icon: ''
    }
};

// ==================== MOSTRAR DESCRIPCIÓN AL SELECCIONAR TIPO ====================
document.getElementById('consultaType').addEventListener('change', function(e) {
    const selectedValue = e.target.value;
    
    // Eliminar descripción anterior si existe
    const existingDescription = document.querySelector('.consulta-description');
    if (existingDescription) {
        existingDescription.remove();
    }
    
    // Si se seleccionó una opción válida, mostrar descripción
    if (selectedValue && consultaDescriptions[selectedValue]) {
        const description = consultaDescriptions[selectedValue];
        
        // Crear elemento de descripción
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'consulta-description';
        descriptionElement.innerHTML = `
            <div class="description-icon">${description.icon}</div>
            <div class="description-content">
                <h4>${description.title}</h4>
                <p>${description.description}</p>
                <div class="description-meta">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>${description.duration}</span>
                </div>
            </div>
            <button type="button" class="description-close" onclick="this.parentElement.remove()">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        `;
        
        // Insertar después del select
        const selectGroup = document.getElementById('consultaType').closest('.form-group');
        selectGroup.insertAdjacentElement('afterend', descriptionElement);
        
        // Animación de entrada
        setTimeout(() => {
            descriptionElement.classList.add('show');
        }, 10);
    }
});

// ==================== CERRAR MODAL ====================
function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

// Cerrar modal al hacer click fuera
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ==================== VALIDACIONES ====================
// Validación de teléfono (solo números, máximo 10)
document.getElementById('telefono').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Establecer fecha mínima como hoy
document.getElementById('fecha').min = new Date().toISOString().split('T')[0];

// Validación de email en tiempo real
document.getElementById('email').addEventListener('blur', function(e) {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        this.setCustomValidity('Por favor, ingresa un email válido');
        this.reportValidity();
    } else {
        this.setCustomValidity('');
    }
});

// ==================== ANIMACIÓN DEL BOTÓN LOADING ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);
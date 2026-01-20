// Validación y envío del formulario
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí normalmente enviarías los datos a un servidor
    // Por ahora solo mostraremos el modal de éxito
    
    // Simular envío
    setTimeout(() => {
        document.getElementById('successModal').classList.remove('hidden');
        document.getElementById('appointmentForm').reset();
    }, 500);
});

function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

// Cerrar modal al hacer click fuera
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Validación de teléfono (solo números)
document.getElementById('telefono').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Establecer fecha mínima como hoy
document.getElementById('fecha').min = new Date().toISOString().split('T')[0];
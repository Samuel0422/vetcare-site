// 1. Smooth scroll para enlaces de navegación
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Opcional: Cierra el navbar en móviles después de hacer clic en un enlace
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });

    // 2. Validación de formulario de contacto y simulación de envío
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');

    contactForm.addEventListener('submit', function(event) {
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            event.preventDefault(); // Detiene el envío si el email es inválido
        } else {
            emailInput.classList.remove('is-invalid');
            simulateEmailSend(event); // Procede con la simulación de envío
        }
    });

    emailInput.addEventListener('input', () => {
        if (validateEmail(emailInput.value)) {
            emailInput.classList.remove('is-invalid');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function simulateEmailSend(event) {
        event.preventDefault(); // Previene el envío del formulario por defecto (el mailto lo manejará)

        const mailtoLink = contactForm.getAttribute('action') + "?subject=Consulta desde la web&body=" +
                           "Nombre: " + document.getElementById('nombre').value + "%0A" +
                           "Email: " + document.getElementById('email').value + "%0A" +
                           "Mensaje: " + document.getElementById('mensaje').value;

        // Abre el enlace mailto en una nueva pestaña (o ventana)
        window.open(mailtoLink, '_blank');

        // Simula el envío y muestra el modal después de un breve retardo
        setTimeout(() => {
            const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
            confirmationModal.show();
            contactForm.reset(); // Limpia los campos del formulario
        }, 1000); // 1 segundo de retardo
    }

    // 3. Funcionalidad de Alternar Modo Oscuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const darkModeIcon = darkModeToggle.querySelector('i'); // Selecciona el elemento del icono

    // Función para aplicar o quitar el modo oscuro
    function setTheme(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            darkModeIcon.classList.remove('fa-moon'); // Cambia el icono a sol
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark'); // Guarda la preferencia
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            darkModeIcon.classList.remove('fa-sun'); // Cambia el icono a luna
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light'); // Guarda la preferencia
        }
    }

    // Verifica el tema preferido del usuario desde localStorage al cargar la página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark'); // Aplica el tema guardado
    } else {
        // Si no hay tema guardado, se establece por defecto el modo claro
        setTheme(false);
    }

    // Añade el event listener al botón de alternar
    darkModeToggle.addEventListener('click', () => {
        // Alterna el tema basándose en el estado actual de la clase del body
        setTheme(!body.classList.contains('dark-mode'));
    });
});

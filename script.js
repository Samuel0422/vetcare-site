/* ===========================================================
   Funciones de validación y UX
   =========================================================== */

// Regex muy simple para validar correo
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Obtener campos
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      let isValid = true;

      // Nombre
      if (!nameInput.value.trim()) {
        nameInput.classList.add("is-invalid");
        isValid = false;
      } else {
        nameInput.classList.remove("is-invalid");
      }

      // Email
      if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add("is-invalid");
        isValid = false;
      } else {
        emailInput.classList.remove("is-invalid");
      }

      // Mensaje
      if (!messageInput.value.trim()) {
        messageInput.classList.add("is-invalid");
        isValid = false;
      } else {
        messageInput.classList.remove("is-invalid");
      }

      // Si todo es válido, simular envío
      if (isValid) {
        // Crear enlace mailto
        const mailtoLink = `mailto:info@vetcare.do?subject=Contacto%20desde%20web&body=${encodeURIComponent(
          messageInput.value
        )}%0D%0A%0D%0AAtentamente,%20${encodeURIComponent(nameInput.value)}`;
        window.location.href = mailtoLink;

        // Mostrar modal de confirmación
        const confirmModal = new bootstrap.Modal(
          document.getElementById("confirmModal")
        );
        setTimeout(() => confirmModal.show(), 500);
        contactForm.reset();
      }
    });
  }

  // Cerrar navbar al hacer clic en un enlace (móvil)
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.getElementById("navbarResponsive");

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navbarCollapse).toggle();
      }
    })
  );
});

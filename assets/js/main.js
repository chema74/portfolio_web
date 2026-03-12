document.addEventListener("DOMContentLoaded", () => {
  /**
   * =========================================================
   * 1. MENÚ MÓVIL
   * =========================================================
   * Gestiona la apertura y cierre del menú responsive.
   */

  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    // Cerrar el menú al hacer clic en cualquier enlace del nav
    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      });
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", (event) => {
      const clickedInsideNav = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      }
    });

    // Si la ventana se hace grande, resetea el menú móvil
    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  }

  /**
   * =========================================================
   * 2. AÑO AUTOMÁTICO EN FOOTER
   * =========================================================
   * Si en tu HTML usas un elemento con id="current-year",
   * este bloque insertará el año actual automáticamente.
   *
   * Ejemplo en HTML:
   * <span id="current-year"></span>
   */

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /**
   * =========================================================
   * 3. SCROLL SUAVE PARA ENLACES INTERNOS
   * =========================================================
   * Solo actúa en enlaces tipo #seccion.
   */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      // Evitar actuar sobre href="#"
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /**
   * =========================================================
   * 4. ANIMACIÓN SUAVE AL HACER SCROLL
   * =========================================================
   * Añade una clase "visible" a los elementos con clase
   * "reveal" cuando entran en pantalla.
   *
   * Si quieres usarlo en HTML:
   * <section class="section reveal">...</section>
   *
   * Y en CSS puedes añadir algo como:
   *
   * .reveal {
   *   opacity: 0;
   *   transform: translateY(20px);
   *   transition: opacity 0.6s ease, transform 0.6s ease;
   * }
   *
   * .reveal.visible {
   *   opacity: 1;
   *   transform: translateY(0);
   * }
   */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  /**
   * =========================================================
   * 5. BOTÓN "VOLVER ARRIBA" OPCIONAL
   * =========================================================
   * Si en el HTML añades un botón con id="back-to-top",
   * este bloque lo mostrará al hacer scroll y permitirá
   * volver arriba suavemente.
   *
   * Ejemplo HTML:
   * <button id="back-to-top" aria-label="Volver arriba">↑</button>
   */

  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
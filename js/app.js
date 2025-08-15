// Carrusel de imágenes tipo rueda
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carrusel-slide');
  const dots = document.querySelectorAll('.carrusel-dot');
  let currentSlide = 0;

  if (slides.length > 0 && dots.length > 0) {
    // Función para mostrar una slide específica
    function showSlide(index) {
      // Remover todas las clases
      slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
      });
      dots.forEach(dot => dot.classList.remove('active'));
      // Configurar las slides
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      // Configurar slide anterior
      const prevIndex = (index - 1 + slides.length) % slides.length;
      slides[prevIndex].classList.add('prev');
      // Configurar slide siguiente
      const nextIndex = (index + 1) % slides.length;
      slides[nextIndex].classList.add('next');
    }

    // Función para ir a la siguiente slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // Event listeners para los dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    // Inicializar el carrusel
    showSlide(0);

    // Auto-play del carrusel
    setInterval(nextSlide, 4000);
  }

  // Menú hamburguesa (en todas las vistas)
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
      if (!e.target.closest('nav') && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  }

  // Submenú desplegable solo al hacer clic en móvil/tablet
  const submenuParent = document.querySelector('nav ul li:has(ul) > a');
  if (submenuParent) {
    submenuParent.addEventListener('click', function(e) {
      if (window.innerWidth <= 900) {
        const parentLi = this.parentElement;
        if (!parentLi.classList.contains('open')) {
          e.preventDefault();
          parentLi.classList.add('open');
        } else {
          // Si ya está abierto, permite la navegación
        }
      }
    });
  }

  // Header-info móvil con iconos desplegables
  const contactItems = document.querySelectorAll('.contact-item');
  let activeContactItem = null;

  function closeAllContactDetails() {
    contactItems.forEach(item => {
      const icon = item.querySelector('.contact-icon');
      const details = item.querySelector('.contact-details');
      icon.classList.remove('active');
      details.classList.remove('active');
    });
    activeContactItem = null;
  }

  function initMobileContactBehavior() {
    if (window.innerWidth <= 1050) {
      contactItems.forEach(item => {
        const icon = item.querySelector('.contact-icon');
        const details = item.querySelector('.contact-details');

        icon.addEventListener('click', function(e) {
          e.stopPropagation();
          
          // Si el mismo item ya está activo, cerrarlo
          if (activeContactItem === item) {
            closeAllContactDetails();
            return;
          }

          // Cerrar el item activo anterior
          closeAllContactDetails();

          // Activar el nuevo item
          icon.classList.add('active');
          details.classList.add('active');
          activeContactItem = item;
        });
      });

      // Cerrar al hacer clic fuera
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.contact-item')) {
          closeAllContactDetails();
        }
      });
    }
  }

  // Inicializar comportamiento móvil
  initMobileContactBehavior();

  // Reinicializar al cambiar el tamaño de la ventana
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1050) {
      closeAllContactDetails();
    } else {
      initMobileContactBehavior();
    }
  });
});

// Galería por tarjeta de tratamiento
document.addEventListener('DOMContentLoaded', function() {
  const galerias = document.querySelectorAll('.tratamiento-galeria');
  
  galerias.forEach((galeria, galeriaIndex) => {
    const track = galeria.querySelector('.tg-track');
    const slides = galeria.querySelectorAll('.tg-slide');
    const prev = galeria.querySelector('.tg-prev');
    const next = galeria.querySelector('.tg-next');
    
    let currentIndex = 0;
    
    function updateGallery() {
      // Mover el track
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Botón previo - solo ocultar si es la primera imagen
      if (prev) {
        if (currentIndex === 0) {
          prev.style.display = 'none';
        } else {
          prev.style.display = 'flex';
        }
      }
      
      // Botón siguiente - solo ocultar si es la última imagen
      if (next) {
        if (currentIndex === slides.length - 1) {
          next.style.display = 'none';
        } else {
          next.style.display = 'flex';
        }
      }
    }
    
    // Botón previo
    if (prev) {
      prev.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateGallery();
        }
      });
    }
    
    // Botón siguiente
    if (next) {
      next.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateGallery();
        }
      });
    }
    
    // Inicializar
    updateGallery();
  });
});

// Navegación de reseñas con flechas (2 tarjetas visibles)
document.addEventListener('DOMContentLoaded', function() {
  const resenasGrid = document.querySelector('.resenas-grid');
  const btnPrev = document.querySelector('.resenas-prev');
  const btnNext = document.querySelector('.resenas-next');

  if (resenasGrid && btnPrev && btnNext) {
    let currentIndex = 0;
    const cardWidth = 300;
    const gap = 32; // 2rem gap
    const visibleCards = 3;
    const totalCards = resenasGrid.querySelectorAll('.resena-card').length;
    const maxIndex = totalCards - visibleCards;

    function updateSlider() {
      const scrollTo = (cardWidth + gap) * currentIndex;
      resenasGrid.scrollTo({ left: scrollTo, behavior: 'smooth' });
      // Ocultar/mostrar flechas
      btnPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
      btnNext.style.visibility = currentIndex === maxIndex ? 'hidden' : 'visible';
    }

    btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
    btnNext.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });
    // Inicializar visibilidad de flechas
    updateSlider();
  }
});


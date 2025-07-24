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
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });
  }

  // Submenú desplegable solo al hacer clic en móvil/tablet
  const submenuParent = document.querySelector('nav ul li:has(ul) > a');
  if (submenuParent) {
    submenuParent.addEventListener('click', function(e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
      }
    });
  }
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
    const visibleCards = 2;
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


// Carrusel de imágenes tipo rueda
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carrusel-slide');
  const dots = document.querySelectorAll('.carrusel-dot');
  let currentSlide = 0;

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
});


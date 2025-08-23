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
    setInterval(nextSlide, 2500);
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
      if (icon && details) {
        icon.classList.remove('active');
        details.classList.remove('active');
      }
    });
    activeContactItem = null;
  }

  function initMobileContactBehavior() {
    // Usar el breakpoint original que funcionaba
    if (window.innerWidth <= 1050) {
      contactItems.forEach(item => {
        const icon = item.querySelector('.contact-icon');
        const details = item.querySelector('.contact-details');

        if (icon && details) {
          // Limpiar event listeners anteriores
          const newIcon = icon.cloneNode(true);
          icon.parentNode.replaceChild(newIcon, icon);
          const newDetails = details.cloneNode(true);
          details.parentNode.replaceChild(newDetails, details);
          
          // Obtener referencias actualizadas
          const currentIcon = item.querySelector('.contact-icon');
          const currentDetails = item.querySelector('.contact-details');
          
          currentIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Si el mismo item ya está activo, cerrarlo
            if (activeContactItem === item) {
              closeAllContactDetails();
              return;
            }

            // Cerrar el item activo anterior
            closeAllContactDetails();

            // Activar el nuevo item
            currentIcon.classList.add('active');
            currentDetails.classList.add('active');
            activeContactItem = item;
          });

          // Agregar event listener de touch para dispositivos táctiles
          currentIcon.addEventListener('touchstart', function(e) {
            e.preventDefault();
            currentIcon.click();
          }, { passive: false });
        }
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

// Alternancia automática de fotos de fondo en la sección móvil "Slogan"
document.addEventListener('DOMContentLoaded', function() {
  const sloganBgs = document.querySelectorAll('.slogan-bg');
  
  if (sloganBgs.length >= 2) {
    let currentSloganIndex = 0;
    let isSloganVisible = true;

    function getNextSloganIndex() {
      return (currentSloganIndex + 1) % sloganBgs.length;
    }

    function changeSloganBackground() {
      if (!isSloganVisible) return;
      
      const current = sloganBgs[currentSloganIndex];
      const nextIndex = getNextSloganIndex();
      const next = sloganBgs[nextIndex];

      // Activar el siguiente fondo
      next.classList.add('active');
      
      // Desactivar el actual
      setTimeout(() => {
        current.classList.remove('active');
      }, 500);

      currentSloganIndex = nextIndex;
    }

    // Cambiar fondo cada 3.5 segundos
    setInterval(changeSloganBackground, 3500);

    // Pausar/Reanudar según visibilidad de la sección
    const sloganSection = document.querySelector('.slogan-movil');
    if (sloganSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            isSloganVisible = true;
          } else {
            isSloganVisible = false;
          }
        });
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

      observer.observe(sloganSection);
    }
  }
});

// Alternancia automática de videos de fondo en la sección "Quienes Somos"
document.addEventListener('DOMContentLoaded', function() {
  const videos = document.querySelectorAll('.video-bg');
  const section = document.querySelector('.quienes-somos');
  
  if (videos.length >= 2 && section) {
    let currentVideoIndex = 0;
    let isSectionVisible = true;

    function getNextIndex() {
      return (currentVideoIndex + 1) % videos.length;
    }

    function crossfadeToNext() {
      if (!isSectionVisible) return;
      const current = videos[currentVideoIndex];
      const nextIndex = getNextIndex();
      const next = videos[nextIndex];

      // Preparar el siguiente video
      next.currentTime = 0;
      next.muted = true;
      next.classList.add('active');

      const playPromise = next.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }

      // Desactivar el actual tras permitir el crossfade
      setTimeout(() => {
        current.classList.remove('active');
        setTimeout(() => {
          if (!current.classList.contains('active')) {
            current.pause();
          }
        }, 1100);
      }, 50);

      currentVideoIndex = nextIndex;
    }

    // Eventos de fin/error para cambiar de video
    videos.forEach((video) => {
      video.addEventListener('ended', crossfadeToNext);
      video.addEventListener('error', crossfadeToNext);
    });

    // Iniciar reproducción del primero
    const first = videos[currentVideoIndex];
    first.muted = true;
    first.currentTime = 0;
    first.classList.add('active');
    const startPromise = first.play();
    if (startPromise && typeof startPromise.catch === 'function') {
      startPromise.catch(() => {
        crossfadeToNext();
      });
    }

    // Pausar/Reanudar según visibilidad de la sección
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          isSectionVisible = true;
          // Reanudar el video activo
          const active = document.querySelector('.video-bg.active');
          if (active) {
            const p = active.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          }
        } else {
          isSectionVisible = false;
          // Pausar todos los videos para evitar consumo y eventos
          videos.forEach(v => v.pause());
        }
      });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    observer.observe(section);
  }
});

// =========================
// Actualización automática del año del copyright
// =========================
document.addEventListener('DOMContentLoaded', function() {
  function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-copyright');
    
    if (copyrightElement) {
      // Reemplazar el año en el texto del copyright
      const copyrightText = copyrightElement.innerHTML;
      const updatedText = copyrightText.replace(/Copyright © \d{4}/, `Copyright © ${currentYear}`);
      copyrightElement.innerHTML = updatedText;
    }
  }
  
  // Actualizar el año solo una vez al cargar la página
  updateCopyrightYear();
});

// =========================
// Popup de Cookies
// =========================
document.addEventListener('DOMContentLoaded', function() {
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptBtn = document.getElementById('accept-cookies');
  
  // Verificar si ya se han aceptado las cookies
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  
  if (!cookiesAccepted && cookiePopup) {
    // Mostrar el popup después de un pequeño delay para mejor UX
    setTimeout(() => {
      cookiePopup.classList.add('show');
    }, 1000);
    
    // Función para aceptar cookies
    function acceptCookies() {
      localStorage.setItem('cookiesAccepted', 'true');
      localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
      hideCookiePopup();
      
      // Aquí puedes agregar código para activar Google Analytics u otras cookies
      console.log('Cookies aceptadas');
    }
    
    // Función para ocultar el popup
    function hideCookiePopup() {
      cookiePopup.classList.remove('show');
      setTimeout(() => {
        cookiePopup.style.display = 'none';
      }, 400);
    }
    
    // Event listener para aceptar cookies
    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptCookies);
    }
    
    // Cerrar popup al hacer clic fuera de él
    document.addEventListener('click', function(e) {
      if (!cookiePopup.contains(e.target) && cookiePopup.classList.contains('show')) {
        hideCookiePopup();
      }
    });
  }
});
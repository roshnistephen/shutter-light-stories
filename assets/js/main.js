// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
    setupMobileNav();
    setupScrollReveal();
    setupGalleryFilters();
    setupLightbox();
    initHeroCarousel();
  });
  
  /* ===========================
     MOBILE NAV
     =========================== */
  
  function setupMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
  
    if (!toggle || !links) return;
  
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
      });
    });
  }
  
  /* ===========================
     SCROLL REVEAL
     =========================== */
  
  function setupScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add("visible"));
      return;
    }
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
  
    revealEls.forEach((el) => observer.observe(el));
  }
  
  /* ===========================
     GALLERY FILTERS
     =========================== */
  
  function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".gallery-item");
  
    if (filterButtons.length === 0 || items.length === 0) return;
  
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter; // "all", "christian", etc.
  
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
  
        items.forEach((item) => {
          const category = item.dataset.category;
          if (filter === "all" || category === filter) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
  
  /* ===========================
     GALLERY LIGHTBOX
     =========================== */
  
  function setupLightbox() {
    const items = document.querySelectorAll(".gallery-item img");
    if (items.length === 0) return;
  
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
    const closeBtn = document.querySelector(".lightbox-close");
  
    if (!lightbox || !lightboxImg || !closeBtn) return;
  
    items.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
      });
    });
  
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.classList.remove("active");
      }
    });
  }
  
  /* ===========================
     HERO CAROUSEL
     =========================== */
  
  function initHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    
    const slidesContainer = carousel.querySelector('.carousel-slides');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    
    if (!slidesContainer || !indicatorsContainer) return;
    
    // Get random images from gallery
    const galleryImages = [
      'assets/images_optimized/christian/christian-01.jpg',
      'assets/images_optimized/christian/christian-02.jpg',
      'assets/images_optimized/hindu/hindu-01.jpg',
      'assets/images_optimized/hindu/hindu-02.jpg',
      'assets/images_optimized/muslim/muslim-01.jpg',
      'assets/images_optimized/muslim/muslim-02.jpg',
      'assets/images_optimized/corporate/corporate-01.jpg',
      'assets/images_optimized/baby/baby-01.jpg'
    ];
    
    // Fisher-Yates shuffle algorithm
    for (let i = galleryImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [galleryImages[i], galleryImages[j]] = [galleryImages[j], galleryImages[i]];
    }
    
    // Select first 5 images
    const selectedImages = galleryImages.slice(0, 5);
    
    // Create slides
    selectedImages.forEach((imgSrc, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.style.backgroundImage = `url('${imgSrc}')`;
      slidesContainer.appendChild(slide);
      
      // Create indicator
      const indicator = document.createElement('button');
      indicator.className = 'carousel-indicator';
      indicator.setAttribute('role', 'tab');
      indicator.setAttribute('aria-label', `Slide ${index + 1}`);
      if (index === 0) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-selected', 'true');
      } else {
        indicator.setAttribute('aria-selected', 'false');
      }
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
    
    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    
    function goToSlide(n) {
      currentSlide = n;
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentSlide);
        ind.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    }
    
    // Auto advance every 4 seconds
    setInterval(nextSlide, 4000);
  }
  
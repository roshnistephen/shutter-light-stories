// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
    setupMobileNav();
    setupScrollReveal();
    setupGalleryFilters();
    setupLightbox();
    initHeroCarousel();
    setupContactForm();
    setupLazyLoadImages();
  });

  /* ===========================
     LAZY LOAD IMAGE ANIMATION
     =========================== */

  function setupLazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    });
  }
  
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
    const filterToggle = document.getElementById('filterToggle');
    const filtersContainer = document.getElementById('galleryFilters');
    const filterButtons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".gallery-item");
  
    if (filterButtons.length === 0 || items.length === 0) return;

    // Setup filter toggle button
    if (filterToggle && filtersContainer) {
      filterToggle.addEventListener('click', () => {
        filterToggle.classList.toggle('active');
        filtersContainer.classList.toggle('open');
      });
    }

    // Handle hash-based category selection from URL
    const handleHashFilter = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && filterButtons.length > 0) {
        const targetBtn = Array.from(filterButtons).find(btn => btn.dataset.filter === hash);
        if (targetBtn) {
          // Open filters panel
          if (filterToggle && filtersContainer) {
            filterToggle.classList.add('active');
            filtersContainer.classList.add('open');
          }
          // Trigger filter
          targetBtn.click();
        }
      }
    };

    // Check hash on load
    handleHashFilter();
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashFilter);
  
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
    
    // Use consistent landscape images from hero_carousel folder (all 800x533, 3:2 aspect ratio)
    const heroImages = [
      'assets/images_optimized/hero_carousel/hero-01.jpg',
      'assets/images_optimized/hero_carousel/hero-02.jpg',
      'assets/images_optimized/hero_carousel/hero-03.jpg',
      'assets/images_optimized/hero_carousel/hero-04.jpg',
      'assets/images_optimized/hero_carousel/hero-05.jpg'
    ];
    
    // Create slides
    heroImages.forEach((imgSrc, index) => {
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
  
  /* ===========================
     CONTACT FORM VALIDATION & WHATSAPP
     =========================== */
  
  function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const WHATSAPP_NUMBER = '918157015535';

    // Form fields
    const fields = {
      name: {
        element: document.getElementById('name'),
        error: document.getElementById('nameError'),
        validate: (value) => {
          if (!value.trim()) return 'Full name is required';
          if (value.trim().length < 2) return 'Name must be at least 2 characters';
          return '';
        }
      },
      email: {
        element: document.getElementById('email'),
        error: document.getElementById('emailError'),
        validate: (value) => {
          if (!value.trim()) return 'Email is required';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return 'Please enter a valid email address';
          return '';
        }
      },
      phone: {
        element: document.getElementById('phone'),
        error: document.getElementById('phoneError'),
        validate: (value) => {
          if (!value.trim()) return 'Phone number is required';
          const phoneRegex = /^[\+]?[0-9\s\-]{10,15}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
          return '';
        }
      },
      type: {
        element: document.getElementById('type'),
        error: document.getElementById('typeError'),
        validate: (value) => {
          if (!value) return 'Please select a celebration type';
          return '';
        }
      },
      message: {
        element: document.getElementById('message'),
        error: document.getElementById('messageError'),
        validate: (value) => {
          if (!value.trim()) return 'Please tell us about your plans';
          if (value.trim().length < 10) return 'Message must be at least 10 characters';
          return '';
        }
      }
    };

    // Real-time validation on blur
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field.element) {
        field.element.addEventListener('blur', () => validateField(key));
        field.element.addEventListener('input', () => {
          if (field.element.classList.contains('error')) {
            validateField(key);
          }
        });
      }
    });

    function validateField(fieldName) {
      const field = fields[fieldName];
      if (!field.element) return true;

      const value = field.element.value;
      const errorMsg = field.validate(value);

      if (errorMsg) {
        field.element.classList.add('error');
        field.element.classList.remove('success');
        if (field.error) field.error.textContent = errorMsg;
        return false;
      } else {
        field.element.classList.remove('error');
        field.element.classList.add('success');
        if (field.error) field.error.textContent = '';
        return true;
      }
    }

    function validateAllFields() {
      let isValid = true;
      Object.keys(fields).forEach(key => {
        if (!validateField(key)) {
          isValid = false;
        }
      });
      return isValid;
    }

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateAllFields()) {
        // Focus first error field
        const firstError = form.querySelector('.form-control.error, .form-textarea.error');
        if (firstError) firstError.focus();
        return;
      }

      // Get form values
      const name = fields.name.element.value.trim();
      const email = fields.email.element.value.trim();
      const phone = fields.phone.element.value.trim();
      const date = document.getElementById('date')?.value || 'Not specified';
      const location = document.getElementById('location')?.value.trim() || 'Not specified';
      const type = fields.type.element.value;
      const message = fields.message.element.value.trim();

      // Format message for WhatsApp
      const whatsappMessage = `*New Enquiry - Shutter Light Stories*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Event Date:* ${date}
*Location:* ${location}
*Celebration Type:* ${type}

*Message:*
${message}`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');

      // Optional: Reset form after submission
      // form.reset();
      // Object.keys(fields).forEach(key => {
      //   if (fields[key].element) {
      //     fields[key].element.classList.remove('success', 'error');
      //   }
      // });
    });
  }
  
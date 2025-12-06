// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
    setupMobileNav();
    setupScrollReveal();
    setupGalleryFilters();
    setupLightbox();
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
  
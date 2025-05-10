// AnaDent Diş Kliniği Ana JavaScript Dosyası

// DOM içeriğinin yüklenmesini bekle
document.addEventListener("DOMContentLoaded", function() {
  "use strict";
  
  // Preloader
  const preloader = document.querySelector(".preloader");
  window.addEventListener("load", function() {
    preloader.classList.add("fade-out");
    setTimeout(function() {
      preloader.style.display = "none";
    }, 600);
  });
  
  // Sticky Header
  const header = document.getElementById("header");
  const sticky = header.offsetTop + 100;
  
  window.addEventListener("scroll", function() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
    
    // Scroll to Top Button göster/gizle
    const scrollTop = document.querySelector(".scroll-top");
    if (window.pageYOffset > 300) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  });
  
  // Scroll to Top Button tıklama işlemi
  const scrollTopBtn = document.querySelector(".scroll-top");
  scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
  // Mobil Menü
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;
  
  // Nav Overlay oluştur
  const navOverlay = document.createElement("div");
  navOverlay.classList.add("nav-overlay");
  body.appendChild(navOverlay);
  
  menuToggle.addEventListener("click", function() {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    navOverlay.classList.toggle("active");
    body.classList.toggle("menu-open");
  });
  
  navOverlay.addEventListener("click", function() {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    this.classList.remove("active");
    body.classList.remove("menu-open");
  });
  
  // Dropdown Menü mobil
  const dropdowns = document.querySelectorAll(".dropdown");
  
  dropdowns.forEach(function(dropdown) {
    const link = dropdown.querySelector("a");
    
    link.addEventListener("click", function(e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      }
    });
  });
  
  // AOS Animasyon Kütüphanesi Başlat
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false
  });
  
  // Doktorlar Slider (Swiper)
  if (document.querySelector(".doctors-swiper")) {
    new Swiper(".doctors-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      autoplay: {
        delay: 5000
      },
      breakpoints: {
        640: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
      }
    });
  }
  
  // Testimonials Slider (Swiper)
  if (document.querySelector(".testimonials-swiper")) {
    new Swiper(".testimonials-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      autoplay: {
        delay: 6000
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }
  
  // Counter Animasyonu
  const stats = document.querySelectorAll(".stat-number");
  
  stats.forEach(function(stat) {
    const targetNumber = parseInt(stat.getAttribute("data-count"));
    let currentNumber = 0;
    const duration = 2000; // 2 saniye
    const stepTime = Math.abs(Math.floor(duration / targetNumber));
    
    const counter = setInterval(function() {
      currentNumber += 1;
      stat.textContent = currentNumber;
      
      if (currentNumber === targetNumber) {
        clearInterval(counter);
      }
    }, stepTime);
  });
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  
  faqItems.forEach(function(item) {
    const header = item.querySelector(".faq-header");
    
    header.addEventListener("click", function() {
      // Diğer tüm açık olanları kapat
      faqItems.forEach(function(otherItem) {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });
      
      // Tıklanan itemı aç veya kapat
      item.classList.toggle("active");
    });
  });
  
  // Randevu Formu Gönderimi
  const appointmentForm = document.getElementById("randevu-form");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Form verilerini al
      const formData = new FormData(this);
      const formValues = {};
      
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      
      // Normalde buraya AJAX ile form gönderimi yapılacak
      // Örnek için başarılı mesajı gösterelim
      
      // Animasyonlu başarı mesajı oluştur
      const successMessage = document.createElement("div");
      successMessage.classList.add("form-success-message");
      successMessage.innerHTML = `
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Randevu Talebiniz Alındı!</h3>
        <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
      `;
      
      // Form alanını temizle ve başarı mesajını göster
      appointmentForm.innerHTML = "";
      appointmentForm.appendChild(successMessage);
      
      // Form başarı mesajını 3 saniye sonra kaldır
      setTimeout(function() {
        appointmentForm.innerHTML = `
          <div class="success-message">
            <h3>Randevu Talebiniz Alındı!</h3>
            <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
            <a href="index.html" class="btn primary-btn mt-3">Ana Sayfaya Dön</a>
          </div>
        `;
      }, 3000);
    });
  }
  
  // Detaylı Randevu Sayfası Formu
  const appointmentPageForm = document.getElementById("appointment-page-form");
  if (appointmentPageForm) {
    appointmentPageForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Form verilerini al
      const formData = new FormData(this);
      const formValues = {};
      
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      
      // Normalde buraya AJAX ile form gönderimi yapılacak
      // Örnek için başarılı mesajı gösterelim
      
      // Animasyonlu başarı mesajı oluştur
      const successMessage = document.createElement("div");
      successMessage.classList.add("form-success-message");
      successMessage.innerHTML = `
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>Randevu Talebiniz Alındı!</h3>
        <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
      `;
      
      // Form alanını temizle ve başarı mesajını göster
      appointmentPageForm.innerHTML = "";
      appointmentPageForm.appendChild(successMessage);
      
      // Form başarı mesajını 3 saniye sonra kaldır
      setTimeout(function() {
        appointmentPageForm.innerHTML = `
          <div class="success-message">
            <h3>Randevu Talebiniz Alındı!</h3>
            <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
            <a href="index.html" class="btn primary-btn mt-3">Ana Sayfaya Dön</a>
          </div>
        `;
      }, 3000);
    });
  }
  
  // Tarih Seçici Minimum Tarih
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  
  dateInputs.forEach(function(input) {
    input.setAttribute('min', today);
  });
  
  // Lightbox Image Gallery
  const galleryImages = document.querySelectorAll('.gallery-image');
  
  if (galleryImages.length > 0) {
    galleryImages.forEach(function(image) {
      image.addEventListener('click', function() {
        const imageUrl = this.getAttribute('data-large') || this.querySelector('img').src;
        
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${imageUrl}" alt="Büyük Görüntü">
            <span class="close-lightbox">&times;</span>
          </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Lightbox'ı kapat
        const closeLightbox = document.querySelector('.close-lightbox');
        closeLightbox.addEventListener('click', function() {
          document.body.removeChild(lightbox);
          document.body.style.overflow = 'auto';
        });
        
        // Dışarıya tıklayarak kapatma
        lightbox.addEventListener('click', function(e) {
          if (e.target === lightbox) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
          }
        });
      });
    });
  }
  
  // Smooth Scroll for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Mobil menüyü kapat
        if (navMenu.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          navOverlay.classList.remove('active');
          body.classList.remove('menu-open');
        }
      }
    });
  });
});
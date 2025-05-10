// AnaDent Diş Kliniği Form İşlemleri JavaScript Dosyası

document.addEventListener("DOMContentLoaded", function() {
  "use strict";
  
  // Form Doğrulama Fonksiyonları
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const validatePhone = (phone) => {
    // Türkiye telefon formatı için (10 veya 11 haneli)
    const re = /^(05|5|\+905)[0-9]{9}$|^(0)[0-9]{10}$/;
    return re.test(String(phone).replace(/\s+/g, ''));
  };
  
  // Form Uyarı Mesajı Oluşturma
  const createErrorMessage = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    return errorDiv;
  };
  
  // Hata Mesajını Temizle
  const clearErrors = (formElement) => {
    const existingErrors = formElement.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
  };
  
  // Input'u Hatalı Olarak İşaretle
  const markAsError = (input) => {
    input.classList.add('error');
    input.addEventListener('input', function() {
      this.classList.remove('error');
      const errorMsg = this.parentElement.querySelector('.form-error');
      if (errorMsg) errorMsg.remove();
    }, { once: true });
  };
  
  // Randevu Formu Validasyonu
  const validateAppointmentForm = (form) => {
    let isValid = true;
    clearErrors(form);
    
    // Ad Soyad
    const nameInput = form.querySelector('#name');
    if (!nameInput.value.trim()) {
      const error = createErrorMessage('Lütfen adınızı ve soyadınızı giriniz.');
      nameInput.parentElement.appendChild(error);
      markAsError(nameInput);
      isValid = false;
    }
    
    // E-posta
    const emailInput = form.querySelector('#email');
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      const error = createErrorMessage('Lütfen geçerli bir e-posta adresi giriniz.');
      emailInput.parentElement.appendChild(error);
      markAsError(emailInput);
      isValid = false;
    }
    
    // Telefon
    const phoneInput = form.querySelector('#phone');
    if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) {
      const error = createErrorMessage('Lütfen geçerli bir telefon numarası giriniz.');
      phoneInput.parentElement.appendChild(error);
      markAsError(phoneInput);
      isValid = false;
    }
    
    // Randevu Tarihi
    const dateInput = form.querySelector('#date, #appointment-date');
    if (dateInput && !dateInput.value) {
      const error = createErrorMessage('Lütfen randevu tarihi seçiniz.');
      dateInput.parentElement.appendChild(error);
      markAsError(dateInput);
      isValid = false;
    }
    
    // Randevu Saati
    const timeInput = form.querySelector('#time, #appointment-time');
    if (timeInput && !timeInput.value) {
      const error = createErrorMessage('Lütfen randevu saati seçiniz.');
      timeInput.parentElement.appendChild(error);
      markAsError(timeInput);
      isValid = false;
    }
    
    // Hizmet
    const serviceInput = form.querySelector('#service');
    if (!serviceInput.value) {
      const error = createErrorMessage('Lütfen bir hizmet seçiniz.');
      serviceInput.parentElement.appendChild(error);
      markAsError(serviceInput);
      isValid = false;
    }
    
    // KVKK Onayı
    const termsCheckbox = form.querySelector('#terms');
    if (termsCheckbox && !termsCheckbox.checked) {
      const error = createErrorMessage('KVKK metnini onaylamanız gerekmektedir.');
      termsCheckbox.parentElement.appendChild(error);
      isValid = false;
    }
    
    return isValid;
  };
  
  // Ana Sayfa Randevu Formu
  const indexForm = document.getElementById('randevu-form');
  if (indexForm) {
    indexForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateAppointmentForm(this)) {
        // Başarılı mesaj animasyonu
        const formContent = this.innerHTML;
        
        // Loading animasyonu göster
        this.innerHTML = `
          <div class="form-loading">
            <div class="spinner"></div>
            <p>Randevunuz oluşturuluyor...</p>
          </div>
        `;
        
        // Simüle edilmiş AJAX isteği (gerçek projede API'ye göre düzenlenecek)
        setTimeout(() => {
          // Başarılı mesaj göster
          this.innerHTML = `
            <div class="form-success">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Randevunuz Başarıyla Alındı!</h3>
              <p>Kısa süre içinde sizinle iletişime geçeceğiz.</p>
            </div>
          `;
          
          // 5 saniye sonra formu resetle
          setTimeout(() => {
            this.innerHTML = formContent;
            this.reset();
          }, 5000);
        }, 2000);
      }
    });
  }
  
  // Randevu Sayfası Formu
  const appointmentPageForm = document.getElementById('appointment-page-form');
  if (appointmentPageForm) {
    appointmentPageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateAppointmentForm(this)) {
        // Başarılı mesaj animasyonu
        const formContent = this.innerHTML;
        
        // Loading animasyonu göster
        this.innerHTML = `
          <div class="form-loading">
            <div class="spinner"></div>
            <p>Randevunuz oluşturuluyor...</p>
          </div>
        `;
        
        // Simüle edilmiş AJAX isteği (gerçek projede API'ye göre düzenlenecek)
        setTimeout(() => {
          // Başarılı mesaj göster
          this.innerHTML = `
            <div class="form-success">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Randevunuz Başarıyla Alındı!</h3>
              <p>Kısa süre içinde sizinle iletişime geçeceğiz.</p>
              <a href="index.html" class="btn primary-btn mt-3">Ana Sayfaya Dön</a>
            </div>
          `;
        }, 2000);
      }
    });
  }
  
  // Telefon Formatı
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value;
      
      // Sadece rakamları korur
      value = value.replace(/\D/g, '');
      
      // 0 ile başlamıyorsa ekleme
      if (value.length > 0 && value.charAt(0) !== '0') {
        value = '0' + value;
      }
      
      // 11 karakterden fazlasını engelleme
      if (value.length > 11) {
        value = value.substring(0, 11);
      }
      
      // Formatlama: 0xxx xxx xx xx
      if (value.length >= 4) {
        value = value.substring(0, 4) + ' ' + value.substring(4);
      }
      if (value.length >= 8) {
        value = value.substring(0, 8) + ' ' + value.substring(8);
      }
      if (value.length >= 11) {
        value = value.substring(0, 11) + ' ' + value.substring(11);
      }
      
      e.target.value = value;
    });
  });
  
  // İletişim Formu
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      clearErrors(this);
      
      // Ad Soyad
      const nameInput = this.querySelector('#name');
      if (!nameInput.value.trim()) {
        const error = createErrorMessage('Lütfen adınızı ve soyadınızı giriniz.');
        nameInput.parentElement.appendChild(error);
        markAsError(nameInput);
        isValid = false;
      }
      
      // E-posta
      const emailInput = this.querySelector('#email');
      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
        const error = createErrorMessage('Lütfen geçerli bir e-posta adresi giriniz.');
        emailInput.parentElement.appendChild(error);
        markAsError(emailInput);
        isValid = false;
      }
      
      // Konu
      const subjectInput = this.querySelector('#subject');
      if (!subjectInput.value.trim()) {
        const error = createErrorMessage('Lütfen bir konu giriniz.');
        subjectInput.parentElement.appendChild(error);
        markAsError(subjectInput);
        isValid = false;
      }
      
      // Mesaj
      const messageInput = this.querySelector('#message');
      if (!messageInput.value.trim()) {
        const error = createErrorMessage('Lütfen mesajınızı giriniz.');
        messageInput.parentElement.appendChild(error);
        markAsError(messageInput);
        isValid = false;
      }
      
      if (isValid) {
        // Başarılı mesaj animasyonu
        const formContent = this.innerHTML;
        
        // Loading animasyonu göster
        this.innerHTML = `
          <div class="form-loading">
            <div class="spinner"></div>
            <p>Mesajınız gönderiliyor...</p>
          </div>
        `;
        
        // Simüle edilmiş AJAX isteği
        setTimeout(() => {
          // Başarılı mesaj göster
          this.innerHTML = `
            <div class="form-success">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Mesajınız Başarıyla Gönderildi!</h3>
              <p>En kısa sürede size dönüş yapacağız.</p>
              <a href="index.html" class="btn primary-btn mt-3">Ana Sayfaya Dön</a>
            </div>
          `;
        }, 2000);
      }
    });
  }
  
  // Doğum Tarihi için maksimum tarih (18 yaş kontrolü)
  const dobInput = document.getElementById('dob');
  if (dobInput) {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const maxDateStr = maxDate.toISOString().split('T')[0];
    dobInput.setAttribute('max', maxDateStr);
  }
  
  // Tarih ve saat seçiminde bugünün tarihi ve sonrası için kısıtlama
  const appointmentDate = document.getElementById('appointment-date');
  if (appointmentDate) {
    const today = new Date().toISOString().split('T')[0];
    appointmentDate.setAttribute('min', today);
    
    // Tarih değiştiğinde saatleri kontrol et (bugün için geçmiş saatleri devre dışı bırak)
    appointmentDate.addEventListener('change', function() {
      const selectedDate = this.value;
      const timeSelect = document.getElementById('appointment-time');
      const today = new Date().toISOString().split('T')[0];
      const currentHour = new Date().getHours();
      
      // Tüm option'ları etkinleştir
      Array.from(timeSelect.options).forEach(option => {
        option.disabled = false;
      });
      
      // Eğer bugün seçildiyse ve saat geçmişse devre dışı bırak
      if (selectedDate === today) {
        Array.from(timeSelect.options).forEach(option => {
          if (option.value) {
            const hourValue = parseInt(option.value.split(':')[0]);
            if (hourValue <= currentHour) {
              option.disabled = true;
            }
          }
        });
      }
    });
  }
});
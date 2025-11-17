'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Project Modal Functionality
const projectModalContainer = document.querySelector('[data-project-modal-container]');
const projectOverlay = document.querySelector('[data-project-overlay]');
const projectModalCloseBtn = document.querySelectorAll('[data-project-modal-close-btn]');
const projectTriggers = document.querySelectorAll('[data-project-trigger]');

// Function to open project modal
function openProjectModal(projectId) {
  // First, close any open modals
  closeProjectModal();
  
  // Then open the specific modal
  const modal = document.querySelector(`[data-project-modal="${projectId}"]`);
  if (modal) {
    projectModalContainer.classList.add('active');
    modal.classList.add('active');
    
    // Reset carousel for projects that have it
    if (projectId === 'habit' || projectId === 'haver') {
      resetCarousel(projectId);
      attachCarouselHandlers(projectId);
    }
  }
}

// Function to close project modal
function closeProjectModal() {
  projectModalContainer.classList.remove('active');
  document.querySelectorAll('.project-modal').forEach(modal => {
    modal.classList.remove('active');
  });
}

// Event listeners for project triggers
projectTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const projectId = trigger.getAttribute('data-project-trigger');
    openProjectModal(projectId);
  });
});

// Event listeners for closing modals
projectOverlay.addEventListener('click', closeProjectModal);
projectModalCloseBtn.forEach(btn => {
  btn.addEventListener('click', closeProjectModal);
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModalContainer.classList.contains('active')) {
    closeProjectModal();
  }
});

// Carousel Functionality - Generic for multiple projects
let currentSlides = {
  habit: 0,
  haver: 0
};

function resetCarousel(projectId) {
  currentSlides[projectId] = 0;
  updateCarousel(projectId);
}

function updateCarousel(projectId) {
  const modal = document.querySelector(`[data-project-modal="${projectId}"]`);
  if (!modal) return;
  
  const slides = modal.querySelectorAll('.carousel-image');
  const indicators = modal.querySelectorAll('.indicator');
  
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlides[projectId]);
  });
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlides[projectId]);
  });
}

function nextSlide(projectId) {
  const modal = document.querySelector(`[data-project-modal="${projectId}"]`);
  if (!modal) return;
  
  const slides = modal.querySelectorAll('.carousel-image');
  currentSlides[projectId] = (currentSlides[projectId] + 1) % slides.length;
  updateCarousel(projectId);
}

function prevSlide(projectId) {
  const modal = document.querySelector(`[data-project-modal="${projectId}"]`);
  if (!modal) return;
  
  const slides = modal.querySelectorAll('.carousel-image');
  currentSlides[projectId] = (currentSlides[projectId] - 1 + slides.length) % slides.length;
  updateCarousel(projectId);
}

// Attach carousel controls directly to each modal (safer than global delegation)
function attachCarouselHandlers(projectId) {
  const modal = document.querySelector(`[data-project-modal="${projectId}"]`);
  if (!modal || modal.dataset.carouselAttached) return;

  const nextBtn = modal.querySelector('[data-carousel-next]');
  const prevBtn = modal.querySelector('[data-carousel-prev]');
  const indicators = modal.querySelectorAll('.indicator');

  if (nextBtn) nextBtn.addEventListener('click', () => nextSlide(projectId));
  if (prevBtn) prevBtn.addEventListener('click', () => prevSlide(projectId));

  indicators.forEach(ind => {
    ind.addEventListener('click', (e) => {
      const idx = Number(e.currentTarget.getAttribute('data-indicator'));
      if (Number.isFinite(idx)) {
        currentSlides[projectId] = idx;
        updateCarousel(projectId);
      }
    });
  });

  modal.dataset.carouselAttached = 'true';
}

// Ensure handlers are attached when opening modals
function openProjectModal(projectId) {
  // First, close any open modals
  closeProjectModal();
  
  // Then open the specific modal
  const modal = document.querySelector(`[data-project-modal="${projectId}"]`);
  if (modal) {
    projectModalContainer.classList.add('active');
    modal.classList.add('active');
    
    // Reset carousel for projects that have it
    if (projectId === 'habit' || projectId === 'haver') {
      resetCarousel(projectId);
      attachCarouselHandlers(projectId);
    }
  }
}
 
// Auto-advance disabled — remove or re-enable if you want automatic sliding.
// If you want auto-advance later, you can re-enable with a controlled interval:
// const carouselInterval = setInterval(() => {
//   const activeModal = document.querySelector('.project-modal.active');
//   if (!activeModal) return;
//   const projectId = activeModal.getAttribute('data-project-modal');
//   if (projectId === 'habit' || projectId === 'haver') nextSlide(projectId);
// }, 5000);

/* Testimonials modal open / populate helper */
(function () {
  const items = document.querySelectorAll('[data-testimonials-item]');
  const modalContainer = document.querySelector('[data-modal-container]');
  if (!items.length || !modalContainer) return;

  const overlay = modalContainer.querySelector('[data-overlay]');
  const modal = modalContainer.querySelector('.testimonials-modal');
  const titleEl = modal.querySelector('[data-modal-title]');
  const textEl = modal.querySelector('[data-modal-text]');
  const avatarBox = modal.querySelector('.modal-avatar-box');
  const closeBtns = modalContainer.querySelectorAll('[data-modal-close-btn]');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const srcTitle = item.querySelector('[data-testimonials-title]');
      const srcText = item.querySelector('[data-testimonials-text]');
      const srcAvatar = item.querySelector('[data-testimonials-avatar]') || item.querySelector('.testimonials-avatar-box');

      if (srcTitle && titleEl) titleEl.textContent = srcTitle.textContent.trim();
      if (srcText && textEl) textEl.innerHTML = srcText.innerHTML;
      if (srcAvatar && avatarBox) avatarBox.innerHTML = srcAvatar.innerHTML;

      modalContainer.classList.add('active');
      overlay.classList.add('active');
    });
  });

  closeBtns.forEach(btn => btn.addEventListener('click', () => {
    modalContainer.classList.remove('active');
    overlay.classList.remove('active');
  }));

  overlay.addEventListener('click', () => {
    modalContainer.classList.remove('active');
    overlay.classList.remove('active');
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-form]');
  const inputs = Array.from(document.querySelectorAll('[data-form-input]'));
  const btn = document.querySelector('[data-form-btn]');

  function validate() {
    btn.disabled = !inputs.every(i => i.checkValidity());
  }

  inputs.forEach(i => i.addEventListener('input', validate));
  validate();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/xdkybzqq', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        // show toast instead of alert
        showToast('Message sent — thank you.', 'success');
        form.reset();
        validate();
      } else {
        showToast('Send failed. Try again later.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error. Please try again.', 'error');
    } finally {
      btn.disabled = false;
    }
  });
});

/* Toast helper functions */
function showToast(message, type = 'success', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  // simple inline SVG icons to avoid dependency timing issues
  const iconSVG = type === 'success'
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 16.2l-4.2-4.2L4 13.3 9.5 18.8 20 8.3 18.8 7.1z"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 7h2v7h-2zM11 16h2v2h-2z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>';

  toast.innerHTML = `
    ${iconSVG}
    <div class="toast-message">${escapeHtml(message)}</div>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;

  container.appendChild(toast);

  // show
  requestAnimationFrame(() => toast.classList.add('show'));

  const tid = setTimeout(() => removeToast(toast), duration);

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(tid);
    removeToast(toast);
  });
}

function removeToast(toast) {
  toast.classList.remove('show');
  toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}

// small helper to avoid injecting raw HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
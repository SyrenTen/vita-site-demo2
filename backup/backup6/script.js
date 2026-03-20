/**********************
 * Tabs (safe if absent)
 **********************/
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    button.classList.add('active');
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
  });
});

/*****************************************
 * Articles: Interesting / Written (safe)
 *****************************************/
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const section = button.getAttribute('data-section');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const interesting = document.getElementById('interesting-section');
    const written = document.getElementById('written-section');
    if (interesting && written) {
      interesting.style.display = (section === 'interesting') ? 'flex' : 'none';
      written.style.display = (section === 'written') ? 'flex' : 'none';
    }
    applyLanguageFilter();
  });
});

// Language filtering (safe)
function applyLanguageFilter() {
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  const activeTabBtn = document.querySelector('.tab-btn.active');
  if (!activeFilterBtn || !activeTabBtn) return;

  const filter = activeFilterBtn.getAttribute('data-filter');
  const section = activeTabBtn.getAttribute('data-section');
  const containerId = (section === 'interesting') ? 'interesting-section' : 'written-section';
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll('.article-card').forEach(card => {
    const isEng = card.classList.contains('lang-eng');
    const isUkr = card.classList.contains('lang-ukr');

    const show =
      filter === 'all' ||
      (filter === 'eng' && isEng) ||
      (filter === 'ukr' && isUkr);

    card.style.display = show ? 'flex' : 'none';
  });
}

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    applyLanguageFilter();
  });
});

/************************************
 * Abstract / Comment toggles (safe)
 ************************************/
document.querySelectorAll('.article-card').forEach(card => {
  const abstractBtn = card.querySelector('.btn-abstract');
  const commentBtn = card.querySelector('.btn-comment');
  const abstract = card.querySelector('.abstract');
  const comment = card.querySelector('.comment');

  if (!abstractBtn || !commentBtn || !abstract || !comment) return;

  // Toggle Abstract
  abstractBtn.addEventListener('click', () => {
    const isVisible = !abstract.classList.contains('hidden');
    abstract.classList.add('hidden');
    comment.classList.add('hidden');
    abstractBtn.classList.remove('active-toggle');
    commentBtn.classList.remove('active-toggle');
    abstractBtn.textContent = 'Abstract';
    commentBtn.textContent = 'My Comment';

    if (!isVisible) {
      abstract.classList.remove('hidden');
      abstractBtn.classList.add('active-toggle');
      abstractBtn.textContent = 'Abstract';
    }
  });

  // Toggle Comment
  commentBtn.addEventListener('click', () => {
    const isVisible = !comment.classList.contains('hidden');
    abstract.classList.add('hidden');
    comment.classList.add('hidden');
    abstractBtn.classList.remove('active-toggle');
    commentBtn.classList.remove('active-toggle');
    abstractBtn.textContent = 'Abstract';
    commentBtn.textContent = 'My Comment';

    if (!isVisible) {
      comment.classList.remove('hidden');
      commentBtn.classList.add('active-toggle');
      commentBtn.textContent = 'My Comment';
    }
  });
});

/************************************
 * Tech mode (make header-safe)
 ************************************/
const techContentElements = document.querySelectorAll('.tech-content');

function toggleTechMode(active) {
  if (active) {
    document.body.classList.add('tech-mode');
    techContentElements.forEach(el => {
      el.style.position = 'static';
      el.style.visibility = 'visible';
      el.style.pointerEvents = 'auto';
    });
  } else {
    document.body.classList.remove('tech-mode');
    setTimeout(() => {
      techContentElements.forEach(el => {
        el.style.position = 'absolute';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    }, 400);
  }
}

// Only wire up if the button exists IN THIS DOCUMENT.
// (On read-me pages it won’t; the button is in main.html.)
(() => {
  const toggleBtn = document.getElementById('toggle-tech');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const active = !document.body.classList.contains('tech-mode');
    toggleTechMode(active);
    toggleBtn.textContent = active ? 'Simple Version' : 'Tech Details';
  });

  window.addEventListener('DOMContentLoaded', () => {
    toggleBtn.classList.add('attention');
    const removeMarker = () => toggleBtn.classList.remove('attention');
    toggleBtn.addEventListener('click', removeMarker);
    setTimeout(removeMarker, 10000);
  });
})();

/*******************************************
 * Carousel + Lightbox (robust + no crashes)
 *******************************************/
(function initCarouselAndLightbox() {
  // Ensure a lightbox exists; create one if missing.
  function ensureLightbox() {
    if (document.getElementById('lightbox-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <img id="lightbox-img" alt="">
      <button id="lightbox-prev" class="lightbox-nav-btn">&#10094;</button>
      <button id="lightbox-next" class="lightbox-nav-btn">&#10095;</button>
    `;
    document.body.appendChild(modal);
  }
  ensureLightbox();

  const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
  const projectImages = Array.from(document.querySelectorAll('.rm-in-info .rm-project-image'));

  // (Re)grab lightbox refs now that we’re sure it exists
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!lightboxModal || !lightboxImg) return; // nothing to do

  let currentIndex = 0;
  let currentCarouselImages = [];
  let isCarouselMode = false;

  function openLightbox(img) {
  lightboxImg.src = img.dataset.full || img.src;
  lightboxModal.style.display = 'flex';
  document.body.classList.add('lightbox-open'); // 👈 dim header
  }

  function showNavButtons(show) {
    if (prevBtn) prevBtn.style.display = show ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = show ? 'block' : 'none';
  }

  function showImage(index) {
    if (!isCarouselMode || !currentCarouselImages.length) return;
    if (index < 0) index = currentCarouselImages.length - 1;
    if (index >= currentCarouselImages.length) index = 0;
    currentIndex = index;
    const img = currentCarouselImages[currentIndex];
    lightboxImg.src = img.dataset.full || img.src;
  }

  // Hook up each carousel’s images to the lightbox
  carouselWrappers.forEach(wrapper => {
    const images = wrapper.querySelectorAll('.carousel-track img');
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index;
        currentCarouselImages = images;
        isCarouselMode = true;
        openLightbox(img);
        showNavButtons(true);
      });
    });
  });

  // Single images outside a carousel
  projectImages.forEach(img => {
    img.addEventListener('click', () => {
      isCarouselMode = false;
      openLightbox(img);
      showNavButtons(false);
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
  if (closeBtn) closeBtn.addEventListener('click', () => {
  lightboxModal.style.display = 'none';
  document.body.classList.remove('lightbox-open'); // 👈 restore header
  });

  lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) {
    lightboxModal.style.display = 'none';
    document.body.classList.remove('lightbox-open'); // 👈 restore header
  }
  });

  // Expose moveSlide globally so inline onclick works
  const carouselStates = {};
  window.moveSlide = function moveSlide(direction, button) {
    const wrapper = button.closest('.carousel-wrapper');
    if (!wrapper) return;
    const track = wrapper.querySelector('.carousel-track');
    const slides = track ? track.querySelectorAll('img') : null;
    const carousel = wrapper.querySelector('.carousel');

    if (!track || !slides || !slides.length || !carousel) return;

    const totalSlides = slides.length;
    const slideWidth = carousel.clientWidth;
    const carouselId = wrapper.dataset.carousel || Math.random().toString(36).slice(2);

    if (!(carouselId in carouselStates)) {
      carouselStates[carouselId] = 0;
    }

    carouselStates[carouselId] += direction;

    if (carouselStates[carouselId] < 0) {
      carouselStates[carouselId] = totalSlides - 1;
    } else if (carouselStates[carouselId] >= totalSlides) {
      carouselStates[carouselId] = 0;
    }

    track.style.transform = `translateX(${-carouselStates[carouselId] * slideWidth}px)`;
  };
})();

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

  function notifyParentLightbox(open) {
  try { window.parent.postMessage({ type: 'LIGHTBOX_TOGGLE', open: !!open }, '*'); } catch (_) {}
  }

  function openLightbox(img) {
    lightboxImg.src = img.dataset.full || img.src;
    lightboxModal.style.display = 'flex';
    document.body.classList.add('lightbox-open');
    notifyParentLightbox(true);   // 👈 tell parent to hide/dim header
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
  document.body.classList.remove('lightbox-open');
  notifyParentLightbox(false);  // 👈 restore header
  });

  lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) {
    lightboxModal.style.display = 'none';
    document.body.classList.remove('lightbox-open');
    notifyParentLightbox(false);  // 👈 restore header
  }
  });

  // Robust per-carousel state (works regardless of Simple/Tech mode)
  const carouselStates = new WeakMap();

  window.moveSlide = function moveSlide(direction, button) {
    const wrapper  = button.closest('.carousel-wrapper');
    if (!wrapper) return;
    const track    = wrapper.querySelector('.carousel-track');
    const slides   = track ? track.querySelectorAll('img') : null;
    const carousel = wrapper.querySelector('.carousel');
    if (!track || !slides || !slides.length || !carousel) return;

    const total = slides.length;
    const width = carousel.clientWidth;

    let index = carouselStates.get(wrapper) || 0;
    index += direction;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    carouselStates.set(wrapper, index);

    track.style.transform = `translateX(${-index * width}px)`;
  };

  // Keep slide aligned if container width changes
  window.addEventListener('resize', () => {
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
      const carousel = wrapper.querySelector('.carousel');
      const track    = wrapper.querySelector('.carousel-track');
      if (!carousel || !track) return;
      const index = carouselStates.get(wrapper) || 0;
      track.style.transform = `translateX(${-index * carousel.clientWidth}px)`;
    });
  });


  /*******************************************
   * Tech Details (read-me pages + optional header)
   * - Works with any buttons having .tech-btn or #toggle-tech
   * - Keeps labels in sync (“Tech Details” / “Simple Version”)
   *******************************************/
  (function initTechDetails() {
    const techSections = document.querySelectorAll('.tech-content');
    const techBtns = document.querySelectorAll('.tech-btn, #toggle-tech');
    if (!techSections.length || !techBtns.length) return;

    function setTechMode(on) {
      if (on) {
        // show → must enable display:block first so transition can play
        techSections.forEach(el => {
          el.style.display = "block";
          // let browser register the change
          requestAnimationFrame(() => {
            document.body.classList.add('tech-mode');
          });
        });
        techBtns.forEach(b => b.textContent = 'Version Simplifiée');
      } else {
        // smooth collapse, then fully hide with display:none
        techSections.forEach(el => {
          el.classList.add('closing-tech');
          setTimeout(() => {
            el.classList.remove('closing-tech');
            el.style.display = "none";
            document.body.classList.remove('tech-mode');
          }, 350); // match CSS transition time
        });
        techBtns.forEach(b => b.textContent = 'Détails techniques');
      }
    }

    // start hidden (Simple Version)
    setTechMode(false);

    techBtns.forEach(btn => {
      btn.addEventListener('click', () =>
        setTechMode(!document.body.classList.contains('tech-mode'))
      );
    });
  })();

  (function initScrollTop() {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) return;

    // Show button after scrolling 300px
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    });

    // Scroll to top smoothly
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();

  (function persistScroll() {
    // Unique key per page (so each read-me / projects page stores its own scroll separately)
    const key = "scroll-" + location.pathname + location.search;

    // Restore scroll on load
    window.addEventListener("load", () => {
      const y = sessionStorage.getItem(key);
      if (y) {
        window.scrollTo(0, parseInt(y, 10));
      }
    });

    // Save scroll before unload
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(key, window.scrollY);
    });
  })();

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop normal reload

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          alert("✅ Message sent successfully!");
          form.reset(); // 👈 clear fields
        } else {
          alert("❌ Failed to send message. Please try again.");
        }
      } catch (err) {
        alert("⚠️ Error sending message.");
      }
    });
  });


})();

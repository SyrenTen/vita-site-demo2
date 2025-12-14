document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Remove active from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

        // Hide all contents
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Activate current
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});



// Tab switching between "interesting" and "written"
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const section = button.getAttribute('data-section');

    // Toggle tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Show correct section
    document.getElementById('interesting-section').style.display = (section === 'interesting') ? 'flex' : 'none';
    document.getElementById('written-section').style.display = (section === 'written') ? 'flex' : 'none';

    applyLanguageFilter(); // Update filter when switching
  });
});

// Language filtering
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    applyLanguageFilter();
  });
});

function applyLanguageFilter() {
  const filter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
  const currentSection = document.querySelector('.tab-btn.active').getAttribute('data-section');
  const activeContainer = (currentSection === 'interesting') ? 'interesting-section' : 'written-section';

  document.querySelectorAll(`#${activeContainer} .article-card`).forEach(card => {
    const isEng = card.classList.contains('lang-eng');
    const isUkr = card.classList.contains('lang-ukr');

    if (filter === 'all' || (filter === 'eng' && isEng) || (filter === 'ukr' && isUkr)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}




document.querySelectorAll('.article-card').forEach(card => {
  const abstractBtn = card.querySelector('.btn-abstract');
  const commentBtn = card.querySelector('.btn-comment');
  const abstract = card.querySelector('.abstract');
  const comment = card.querySelector('.comment');

  // Toggle Abstract
  abstractBtn.addEventListener('click', () => {
    const isVisible = !abstract.classList.contains('hidden');

    // Hide both
    abstract.classList.add('hidden');
    comment.classList.add('hidden');
    abstractBtn.classList.remove('active-toggle');
    commentBtn.classList.remove('active-toggle');
    abstractBtn.textContent = 'Abstract';
    commentBtn.textContent = 'My Comment';

    if (!isVisible) {
      // Show abstract
      abstract.classList.remove('hidden');
      abstractBtn.classList.add('active-toggle');
      abstractBtn.textContent = 'Abstract';
    }
  });

  // Toggle Comment
  commentBtn.addEventListener('click', () => {
    const isVisible = !comment.classList.contains('hidden');

    // Hide both
    abstract.classList.add('hidden');
    comment.classList.add('hidden');
    abstractBtn.classList.remove('active-toggle');
    commentBtn.classList.remove('active-toggle');
    abstractBtn.textContent = 'Abstract';
    commentBtn.textContent = 'My Comment';

    if (!isVisible) {
      // Show comment
      comment.classList.remove('hidden');
      commentBtn.classList.add('active-toggle');
      commentBtn.textContent = 'My Comment';
    }
  });
});

//TOGGLE TECH MODE START

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
    // Start transition by removing tech-mode class
    document.body.classList.remove('tech-mode');

    // After transition duration, hide & position absolute
    setTimeout(() => {
      techContentElements.forEach(el => {
        el.style.position = 'absolute';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    }, 400); // match CSS transition duration
  }
}


const toggleBtn = document.getElementById('toggle-tech');
toggleBtn.addEventListener('click', () => {
  const active = !document.body.classList.contains('tech-mode');
  toggleTechMode(active);
  toggleBtn.textContent = active ? 'Simple Version' : 'Tech Details';
});



//TOGGLE TECH MODE END

window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-tech');

    // Add marker class
    toggleBtn.classList.add('attention');

    // Remove marker after first click OR after 6 seconds
    const removeMarker = () => toggleBtn.classList.remove('attention');
    toggleBtn.addEventListener('click', removeMarker);
    setTimeout(removeMarker, 10000); // fallback auto-remove
});

document.addEventListener('DOMContentLoadedInline', () => {
    const toggleBtn = document.getElementById('toggle-tech');

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('tech-mode');
    });
});




// Store current index per carousel
let carouselStates = {};

function moveSlide(direction, button) {
  const wrapper = button.closest('.carousel-wrapper'); // Find which carousel
  const track = wrapper.querySelector('.carousel-track');
  const slides = track.querySelectorAll('img');
  const totalSlides = slides.length;
  const slideWidth = wrapper.querySelector('.carousel').clientWidth;

  // Unique ID for carousel
  const carouselId = wrapper.dataset.carousel;

  // Initialize state if doesn't exist
  if (!(carouselId in carouselStates)) {
    carouselStates[carouselId] = 0;
  }

  // Update index
  carouselStates[carouselId] += direction;

  if (carouselStates[carouselId] < 0) {
    carouselStates[carouselId] = totalSlides - 1;
  } else if (carouselStates[carouselId] >= totalSlides) {
    carouselStates[carouselId] = 0;
  }

  // Move track
  track.style.transform = `translateX(${-carouselStates[carouselId] * slideWidth}px)`;
}







// Select ALL carousel images but grouped by carousel wrapper
const carouselWrappers = document.querySelectorAll('.carousel-wrapper');

const projectImages = Array.from(document.querySelectorAll('.rm-in-info .rm-project-image'));
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentIndex = 0;
let currentCarouselImages = [];
let isCarouselMode = false;

// For each carousel
carouselWrappers.forEach(wrapper => {
  const images = wrapper.querySelectorAll('.carousel-track img');

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      currentCarouselImages = images; // store only this carousel's images
      isCarouselMode = true;
      openLightbox(img);
      showNavButtons(true);
    });
  });
});

// Open from project images
projectImages.forEach(img => {
  img.addEventListener('click', () => {
    isCarouselMode = false;
    openLightbox(img);
    showNavButtons(false);
  });
});

function openLightbox(img) {
  lightboxImg.src = img.dataset.full || img.src;
  lightboxModal.style.display = 'flex';
}

function showNavButtons(show) {
  prevBtn.style.display = show ? 'block' : 'none';
  nextBtn.style.display = show ? 'block' : 'none';
}

function showImage(index) {
  if (!isCarouselMode) return; // do nothing if not carousel mode

  if (index < 0) index = currentCarouselImages.length - 1;
  if (index >= currentCarouselImages.length) index = 0;
  currentIndex = index;
  lightboxImg.src = currentCarouselImages[currentIndex].dataset.full || currentCarouselImages[currentIndex].src;
}


prevBtn.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  showImage(currentIndex + 1);
});

closeBtn.addEventListener('click', () => {
  lightboxModal.style.display = 'none';
});

lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) {
    lightboxModal.style.display = 'none';
  }
});


//CONTACT CLEARENCE


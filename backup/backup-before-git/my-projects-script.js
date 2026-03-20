// my-projects-script.js
// Left-side vertical slides (3 cards per slide) + arrow visibility
// Right-side pop-up-on-scroll (skip animation for initially-visible items)

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- LEFT slides ---------- */
  const leftGrid  = document.querySelector('.left-grid');
  const upArrow   = document.querySelector('.up-arrow');
  const downArrow = document.querySelector('.down-arrow');

  if (leftGrid) {
    const cards = Array.from(leftGrid.querySelectorAll('.project-cell-grid'));
    if (cards.length > 0) {
      const perSlide = 3; // 3 cells per slide
      let currentSlide = 0;
      const slides = [];

      // Build slides from existing cards
      for (let i = 0; i < cards.length; i += perSlide) {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        cards.slice(i, i + perSlide).forEach(card => slide.appendChild(card));
        slides.push(slide);
      }

      // Reset container and mount slides
      leftGrid.innerHTML = '';
      slides.forEach(slide => leftGrid.appendChild(slide));
      slides[0].classList.add('active');

      // Make first-slide visible immediately but without animation
      const firstCells = slides[0].querySelectorAll('.project-cell');
      firstCells.forEach(cell => {
        cell.classList.add('visible', 'no-anim'); // show now, but disable transition
      });
      // remove the 'no-anim' flag shortly after so future shows animate normally
      requestAnimationFrame(() => {
        setTimeout(() => firstCells.forEach(cell => cell.classList.remove('no-anim')), 60);
      });

      function updateArrows() {
        if (slides.length <= 1) {
          if (upArrow)   upArrow.classList.add('is-hidden');
          if (downArrow) downArrow.classList.add('is-hidden');
          return;
        }
        if (currentSlide === 0) {
          if (upArrow)   upArrow.classList.add('is-hidden');
          if (downArrow) downArrow.classList.remove('is-hidden');
        } else if (currentSlide === slides.length - 1) {
          if (downArrow) downArrow.classList.add('is-hidden');
          if (upArrow)   upArrow.classList.remove('is-hidden');
        } else {
          if (upArrow)   upArrow.classList.remove('is-hidden');
          if (downArrow) downArrow.classList.remove('is-hidden');
        }
      }

      // showSlide: activate slide and animate its cells (staggered)
      function showSlide(index) {
        if (index < 0 || index >= slides.length) return;

        // switch active slide
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        currentSlide = index;
        updateArrows();

        // For a clean pop-in effect: remove visible from all cells, then add staggered
        slides.forEach(slide => {
          slide.querySelectorAll('.project-cell').forEach(c => c.classList.remove('visible'));
        });

        const targetCells = slides[index].querySelectorAll('.project-cell');
        targetCells.forEach((cell, idx) => {
          // staggered reveal
          setTimeout(() => {
            cell.classList.add('visible');
          }, idx * 90);
        });
      }

      // arrow handlers
      upArrow && upArrow.addEventListener('click', () => {
        if (currentSlide > 0) showSlide(currentSlide - 1);
      });
      downArrow && downArrow.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
      });

      // initial state
      updateArrows();
    }
  }

  // ===== Right column observer for pop-up =====
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.right-column .project-cell').forEach((cell, idx) => {
      // Skip the very first cell if you don’t want it animated immediately
      if (idx === 0) {
        cell.classList.add('visible', 'no-anim');
      } else {
        observer.observe(cell);
      }
    });
});

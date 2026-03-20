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


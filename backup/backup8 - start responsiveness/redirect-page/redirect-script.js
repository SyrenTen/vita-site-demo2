const buttons = document.querySelectorAll('.button-wrapper');
const descriptionDiv = document.getElementById('description');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        descriptionDiv.textContent = btn.dataset.description;
        descriptionDiv.classList.add('show'); // fade in
    });

    btn.addEventListener('mouseleave', () => {
        descriptionDiv.classList.remove('show'); // fade out
        // optional: clear text after fade
        setTimeout(() => {
            if (!descriptionDiv.classList.contains('show')) {
                descriptionDiv.textContent = '';
            }
        }, 500); // match transition duration
    });
});

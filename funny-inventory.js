// FUNNY INVENTORY
// playlist ID: PL4Jc69rq8qm9f8JzRjdqD8SSus0KV1HvC
window.addEventListener('DOMContentLoaded', () => {
    const inventoryButton = document.getElementById('inventory-button');
    const inventoryPopup = document.getElementById('funny-inventory');
    const radioInventoryItem = document.getElementById('radio-inventory-item');
    const radioPlayerContainer = document.getElementById('radio-player-container');
    const radioPlayer = document.getElementById('radio-player');
    const radioImage = document.getElementById('radio-image');
    const closeRadio = document.getElementById('close-radio');

    let player;
    let isPlaying = false;
    let dragActive = false;
    let isDragging = false;
    let offsetX, offsetY, startX, startY;

    const playlistId = 'PL4Jc69rq8qm9f8JzRjdqD8SSus0KV1HvC';

    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            playerVars: {
                listType: 'playlist',
                list: playlistId
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    function isRadioVisible() {
        return radioPlayerContainer && getComputedStyle(radioPlayerContainer).display !== 'none';
    }

    function onPlayerReady() {
        const savedPlayerState = localStorage.getItem('radioPlayerState');
        if (savedPlayerState) {
            const state = JSON.parse(savedPlayerState);

            // Always start hidden on reload
            radioPlayerContainer.style.display = 'none';

            // Restore last known position
            if (state.position?.left && state.position?.top) {
                radioPlayerContainer.style.left = state.position.left;
                radioPlayerContainer.style.top = state.position.top;
            } else {
                radioPlayerContainer.style.left = '20px';
                radioPlayerContainer.style.top = '20px';
            }

            // Restore visual "playing" state only
            isPlaying = state.playing || false;
            if (isPlaying) {
                radioImage.classList.add('playing');
            } else {
                radioImage.classList.remove('playing');
            }
        } else {
            // No saved data → defaults
            radioPlayerContainer.style.left = '20px';
            radioPlayerContainer.style.top = '20px';
            radioPlayerContainer.style.display = 'none';
            isPlaying = false;
            radioImage.classList.remove('playing');
        }
    }

    // Inventory button → show popup under button
    inventoryButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = inventoryButton.getBoundingClientRect();
        inventoryPopup.style.position = 'absolute';
        inventoryPopup.style.top = `${rect.bottom + window.scrollY}px`;
        inventoryPopup.style.left = `${rect.left + window.scrollX}px`;
        inventoryPopup.style.display =
            inventoryPopup.style.display === 'block' ? 'none' : 'block';
    });

    // Click outside → hide popup
    document.addEventListener('click', (e) => {
        if (!inventoryPopup.contains(e.target) && e.target !== inventoryButton) {
            inventoryPopup.style.display = 'none';
        }
    });

    // Radio inventory item → toggle open/close
    radioInventoryItem.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        inventoryPopup.style.display = 'none';

        if (isRadioVisible()) {
            // Hide & stop music
            radioPlayerContainer.style.display = 'none';
            if (isPlaying && player?.pauseVideo) {
                try { player.pauseVideo(); } catch {}
            }
            radioImage.classList.remove('playing');
            isPlaying = false;
        } else {
            // Show (no autoplay)
            radioPlayerContainer.style.display = 'block';
        }
        savePlayerState();
    });

    // Play/pause → only if not dragging
    radioImage.addEventListener('click', (e) => {
        if (dragActive || isDragging) return;
        if (isPlaying) {
            player.pauseVideo();
            radioImage.classList.remove('playing');
        } else {
            player.playVideo();
            radioImage.classList.add('playing');
        }
        isPlaying = !isPlaying;
        savePlayerState();
    });

    // Close button
    closeRadio.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    closeRadio.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        radioPlayerContainer.style.display = 'none';
        try { player.pauseVideo(); } catch {}
        radioImage.classList.remove('playing');
        isPlaying = false;
        savePlayerState();
    });

    // Drag start
    radioPlayer.addEventListener('mousedown', (e) => {
        if (e.target.closest('.close-button')) return;
        e.preventDefault();
        dragActive = true;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        offsetX = e.clientX - radioPlayerContainer.getBoundingClientRect().left;
        offsetY = e.clientY - radioPlayerContainer.getBoundingClientRect().top;
        radioPlayer.style.cursor = 'grabbing';
    });

    // Drag move
    document.addEventListener('mousemove', (e) => {
        if (!dragActive) return;
        const movedX = Math.abs(e.clientX - startX);
        const movedY = Math.abs(e.clientY - startY);
        if (movedX > 3 || movedY > 3) {
            isDragging = true;
        }
        radioPlayerContainer.style.left = `${e.clientX - offsetX}px`;
        radioPlayerContainer.style.top = `${e.clientY - offsetY}px`;
    });

    // Drag end
    document.addEventListener('mouseup', () => {
        if (dragActive) {
            dragActive = false;
            radioPlayer.style.cursor = 'grab';
            savePlayerState();
        }
    });

    function savePlayerState() {
        const state = {
            visible: isRadioVisible(),
            playing: isPlaying,
            position: {
                left: radioPlayerContainer.style.left,
                top: radioPlayerContainer.style.top
            }
        };
        localStorage.setItem('radioPlayerState', JSON.stringify(state));
    }
});

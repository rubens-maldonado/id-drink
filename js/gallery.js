function initGallery() {
    let previousFocus;
    const background = [...document.body.children].filter(el => !['SCRIPT'].includes(el.tagName) && el.id !== 'lightbox');
    const previousInert = new Map();

    function dismissLightbox() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
        background.forEach(el => { el.inert = previousInert.get(el) || false; });
        previousFocus?.focus({ preventScroll: true });
    }
    function openLightbox(item) {
        const img = item.querySelector('img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');

        previousFocus = item;
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.getAttribute('data-title') || img.alt;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        background.forEach(el => { previousInert.set(el, el.inert); el.inert = true; });
        document.querySelector('.lightbox-close').focus();
    }

    function closeLightbox(event) {
        if (event.target === document.getElementById('lightbox') ||
            event.target.closest('.lightbox-close')) {
            dismissLightbox();
        }
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && document.getElementById('lightbox').classList.contains('active')) {
            e.preventDefault();
            document.querySelector('.lightbox-close').focus();
        }
        if (e.key === 'Escape') {
            const lightbox = document.getElementById('lightbox');
            if (lightbox.classList.contains('active')) {
                dismissLightbox();
            }
        }
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => openLightbox(item));
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox(item);
            }
        });
    });
    document.getElementById('lightbox').addEventListener('click', closeLightbox);
}

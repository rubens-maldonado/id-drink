function initMenu() {
    let overlayTimer;
    function toggleMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('menu-overlay');

        clearTimeout(overlayTimer);
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');

        const isOpen = mobileMenu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        mobileMenu.inert = !isOpen;

        if (isOpen) {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            overlayTimer = setTimeout(() => overlay.classList.add('active'), 10);
        } else {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            overlayTimer = setTimeout(() => overlay.style.display = 'none', 300);
        }
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.getElementById('mobile-menu').classList.contains('open')) {
            toggleMenu();
            document.getElementById('hamburger').focus();
        }
    });

    document.querySelectorAll('#hamburger, #menu-overlay, #mobile-menu a').forEach(element => {
        element.addEventListener('click', toggleMenu);
    });
}

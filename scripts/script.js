const navButton = document.querySelector('#nav-button');
const navMenu = document.querySelector('.nav-panel');

navButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navButton.classList.toggle('open');
    navButton.setAttribute('aria-label', isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu');
    navButton.setAttribute('aria-expanded', navMenu.classList.contains('open'));
})
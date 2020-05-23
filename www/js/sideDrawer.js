const hamburgerButton = document.querySelector('.hb-button');
const mobileNav = document.querySelector('.side-drawer');
const backdrop = document.querySelector('.backdrop');

function openMobile() {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
}

function closeMobile() {
    mobileNav.classList.remove('open');
    backdrop.classList.remove('open');
}

hamburgerButton.addEventListener('click', openMobile);
backdrop.addEventListener('click', closeMobile);

const hamburgerButton = document.querySelector('.hb-button');
const sideDrawer = document.querySelector('#side-drawer');
const backdrop = document.querySelector('.backdrop');

sideDrawer.classList.add('transition');

function openMobile() {
    sideDrawer.classList.add('open');
    backdrop.classList.add('open');
}

function closeMobile() {
    sideDrawer.classList.remove('open');
    backdrop.classList.remove('open');
}

hamburgerButton.addEventListener('click', openMobile);
backdrop.addEventListener('click', closeMobile);

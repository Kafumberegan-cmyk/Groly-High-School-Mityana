// Header scroll behavior
let lastScrollTop = 0;
const topHeader = document.getElementById('topHeader');
const mainHeader = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        topHeader.classList.add('hidden');
        mainHeader.style.top = '0';
    } else {
        // Scrolling up
        topHeader.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});
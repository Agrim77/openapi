document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const navitem = document.querySelectorAll('.nav-item');
        const logoImage = document.querySelector('.logo');
        const scrollThreshold = 200;
      
        if (window.scrollY > scrollThreshold) {
          navbar.classList.add('scrolled');
          navitem.forEach(item => item.classList.add('scrolled'));
          logoImage.src = 'images/coloured-logo.webp';
        } else {
          navbar.classList.remove('scrolled');
          navitem.forEach(item => item.classList.remove('scrolled'));
          logoImage.src = 'images/white-logo-vertical.webp';
        }
      });
      
});
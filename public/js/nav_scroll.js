document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const logoImage = document.querySelector('.logo');
        const scrollThreshold = 200;
      
        if (window.scrollY > scrollThreshold) {
          navbar.classList.add('scrolled');
          logoImage.src = 'images/IHLogonew.png';
        } else {
          navbar.classList.remove('scrolled');
          logoImage.src = 'images/white-logo-vertical.png';
        }
      });
      
});
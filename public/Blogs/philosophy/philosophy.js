document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const sidebar = document.querySelector('.sidebar');
    const sidebarCloseBtn = document.querySelector('.sidebar-close');
    const navLinks = document.querySelectorAll('.nav-link');

    navbarToggler.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    sidebarCloseBtn.addEventListener('click', function() {
        sidebar.classList.remove('show');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

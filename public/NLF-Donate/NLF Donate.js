document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const sidebar = document.querySelector('.sidebar');
    const sidebarCloseBtn = document.querySelector('.sidebar-close');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNumberInput = document.getElementById('mobile-number');
    const form = document.getElementById('donation-form');

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

    // Mobile number validation
    mobileNumberInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10); // Limit to 10 characters
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const baseUrl = window.location.origin;
        
        if (mobileNumberInput.value.length !== 10) {
            alert('Mobile number must be exactly 10 digits.');
            return;
        }
    
        var form = document.getElementById('donation-form');
        var formData = new FormData(form);
    
        var data = {};
        for (var [key, value] of formData.entries()) {
            data[key] = value;
        }
    
        // Optional: Save the form data to your server if needed
        fetch(`${baseUrl}/donate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            if (result) {
                // Redirect to PayPal with the transaction ID
                const paypalLink = `https://www.sandbox.paypal.com/donate/?hosted_button_id=MTYJ9JEWRRT2Q`;
                window.location.href = paypalLink;
            } else {
                alert('Failed to prepare the donation.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    
});

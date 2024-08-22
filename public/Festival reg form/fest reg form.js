document.getElementById('festivalForm').addEventListener('submit', function(event) {
    let isValid = true;
    event.preventDefault();
    const baseUrl = window.location.origin;

    // Clear previous error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.style.display = 'none');

    // Validate fields
    const requiredFields = ['firstName', 'lastName', 'email', 'mobileNumber', 'adults', 'children', 'volunteer', 'preference', 'accommodation'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);

        if (input.value.trim() === '') {
            errorElement.textContent = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
            errorElement.style.display = 'block';
            isValid = false;
        }
    });

    // Prevent form submission if there are errors
    if (!isValid) {
        event.preventDefault();
    }
   
    var form = document.getElementById('festivalForm');
    var formData = new FormData(form);

    var data = {};
    for (var [key, value] of formData.entries()) {
        data[key] = value;
    }

    fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Convert the data object to JSON
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert(result.msg);
        window.location.href = baseUrl;
        })
    .catch(error => {
        console.error('Error:', error);
    });
    
});

document.getElementsByClassName('donate-btn')[0].addEventListener('click',()=>{
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/NLF-Donate/NLF%20Donate.html`;
});


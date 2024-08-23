document.getElementById('festivalForm').addEventListener('submit', function(event) {
    let isValid = true;

    // Clear previous error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.style.display = 'none');

    // Validate text fields
    const requiredFields = ['firstName', 'lastName', 'email', 'mobileNumber', 'adults', 'children', 'accommodation'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);

        if (input.value.trim() === '') {
            errorElement.textContent = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
            errorElement.style.display = 'block';
            isValid = false;
        }
    });

    // Validate radio buttons for 'volunteer'
    const volunteerError = document.getElementById('volunteerError');
    if (!document.querySelector('input[name="volunteer"]:checked')) {
        volunteerError.textContent = "Volunteering preference is required.";
        volunteerError.style.display = 'block';
        isValid = false;
    }

    // Validate radio buttons for 'preference'
    const preferenceError = document.getElementById('preferenceError');
    if (!document.querySelector('input[name="preference"]:checked')) {
        preferenceError.textContent = "Festival preference is required.";
        preferenceError.style.display = 'block';
        isValid = false;
    }

    // Prevent form submission if there are errors
    if (!isValid) {
        event.preventDefault();
    }
});

document.getElementById('festivalForm').addEventListener('submit',async(event)=>{
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const formObject = Object.fromEntries(formData.entries());

    const baseUrl = window.location.origin;

    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();
        alert(result.msg);
        console.log('Success:', result);

        // Handle the response as needed (e.g., show a success message, redirect, etc.)
    } catch (error) {
        console.error('Error:', error);
        // Handle errors (e.g., show an error message to the user)
    }
    window.location.href = baseUrl;
});

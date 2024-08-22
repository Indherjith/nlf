document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const ticketsInput = document.getElementById('tickets');

    document.getElementById('bookNowButton').addEventListener('click', validateForm);

    // Mobile number validation
    mobileNumberInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10); // Limit to 10 characters
        }
    });

    // Form submission validation for mobile number length
    form.addEventListener('submit', function(event) {
        if (mobileNumberInput.value.length !== 10) {
            event.preventDefault(); // Prevent form submission if the length is not 10
            alert('Mobile number must be exactly 10 digits.');
        }
    });
});

function validateForm() {
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');

    let isValid = true;

    // Validate each input field
    const inputs = [
        { id: 'firstName', errorId: 'firstNameError' },
        { id: 'lastName', errorId: 'lastNameError' },
        { id: 'mobileNumber', errorId: 'mobileNumberError' },
        { id: 'email', errorId: 'emailError' },
        { id: 'address', errorId: 'addressError' },
        { id: 'city', errorId: 'cityError' },
        { id: 'state', errorId: 'stateError' },
        { id: 'pincode', errorId: 'pincodeError' },
        { id: 'events', errorId: 'eventsError' },
        { id: 'tickets', errorId: 'ticketsError' },
    ];

    inputs.forEach(input => {
        const element = document.getElementById(input.id);
        const errorElement = document.getElementById(input.errorId);
        if (!element.value) {
            errorElement.textContent = 'This field is required';
            errorElement.style.color = 'red';
            isValid = false;
        } else {
            // Additional validation for specific fields
            if (input.id === 'mobileNumber') {
                const mobileNumberPattern = /^\d{10}$/;
                if (!mobileNumberPattern.test(element.value)) {
                    errorElement.textContent = 'Mobile number must be 10 digits';
                    errorElement.style.color = 'red';
                    isValid = false;
                }
            }
            if (input.id === 'tickets') {
                if (element.value <= 0) {
                    errorElement.textContent = 'Tickets must be a positive number';
                    errorElement.style.color = 'red';
                    isValid = false;
                }
            }
        }
    });

    if (isValid) {
        alert('Form submitted successfully');
        document.getElementById('bookingForm').submit(); // Submit the form if validation passes
    }
}

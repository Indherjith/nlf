var paymentDetails = {};
var paid = false;

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

    // Check if payment is completed
    if (!paid) {
        alert('Please complete the payment before submitting the form.');
        isValid = false;
    }

    // Prevent form submission if there are errors
    if (!isValid) {
        event.preventDefault();
    }
});

document.getElementById('festivalForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // If the form is not valid or payment is not completed, don't proceed with the fetch request
    if (!paid) {
        alert('Please complete the payment before submitting the form.');
        return;
    }

    const form = event.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    let resultant = {...formObject,'amt':paymentDetails.amt+" USD",'st':paymentDetails.st,'tx':paymentDetails.tx}
    const baseUrl = window.location.origin;

    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resultant)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();
        
        console.log('Success:', result);
        if(result.msg == 'Something went wrong, plz try again'){
            alert("Please Enter the valid Values");
        }
        else{
            alert(result.msg);
            setTimeout(()=>{window.location.href = window.location.origin},10000);
        }
        

        // Handle the response as needed (e.g., show a success message, redirect, etc.)
    } catch (error) {
        console.error('Error:', error);
        // Handle errors (e.g., show an error message to the user)
    }

});

// Function to update payment details and status
function getpayments(data, paidstatus) {
    paymentDetails = data;
    paid = paidstatus;
    console.log(paymentDetails, paid);
}

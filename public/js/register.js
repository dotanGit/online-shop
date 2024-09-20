document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    // Check if there's an error message from the server in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const serverError = urlParams.get('error');

    if (serverError) {
        // Display the error message ("Username already exists") , decode meaning it removes the %20 back to space
        errorMessage.innerHTML = decodeURIComponent(serverError);
        errorMessage.style.display = "block";
    }

    form.addEventListener('submit', function (event) {
        const password = document.getElementById('password').value;

        const letter = /[a-zA-Z]/; 
        const symbol = /[!@#$%^&*(),.?":{}|<>]/;

        // Validate password length
        if (password.length < 8) {
            errorMessage.innerHTML = "Password must be at least 8 characters long!";
            errorMessage.style.display = "block";
            event.preventDefault(); // Prevent form submission
        } 
        // Check if password contains at least one letter
        else if (!letter.test(password)) {
            errorMessage.innerHTML = "Password must contain at least one letter!";
            errorMessage.style.display = "block";
            event.preventDefault(); // Prevent form submission
        }
        // Check if password contains at least one symbol
        else if (!symbol.test(password)) {
            errorMessage.innerHTML = "Password must contain at least one symbol!";
            errorMessage.style.display = "block";
            event.preventDefault(); // Prevent form submission
        }
        else {
            errorMessage.style.display = "none"; // Hide error message if validation passes
        }
    });
});

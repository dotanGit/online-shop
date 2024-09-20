document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {
        var password = document.getElementById('password').value;

        // Check if the password length is exactly 8 characters
        if (password.length < 8) {
            errorMessage.innerHTML = "Password must be at least 8 characters long!";
            errorMessage.style.display = "block";
            event.preventDefault(); // Prevent form submission
        } else {
            errorMessage.style.display = "none"; // Hide error message if validation passes
        }
    });
});
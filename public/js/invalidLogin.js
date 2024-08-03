document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.has('error'); // Check for the presence of the 'error' parameter

    if (error) {
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement.textContent = 'Invalid username or password';
      errorMessageElement.style.display = 'block';
    }
  });
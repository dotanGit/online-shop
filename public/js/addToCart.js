document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.getElementById('add-to-cart');
  const productDetails = document.querySelector('.single-pro-details');
  const productId = productDetails.getAttribute('data-id');
  const quantityInput = document.getElementById('quantity');

  const addToCartModal = new bootstrap.Modal(document.getElementById('addToCartModal'));
  const continueShoppingButton = document.getElementById('continueShoppingButton');
  const goToCartButton = document.getElementById('goToCartButton');

  addToCartButton.addEventListener('click', async () => {
      const quantity = quantityInput.value;

      try {
          const response = await fetch('/cart/add', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ productId, quantity })
          });

          if (response.redirected) {
              window.location.href = response.url;
          } else if (response.ok) {
              addToCartModal.show();
          } else {
              const result = await response.json();
              console.error('Error:', result);
              alert('Failed to add product to cart.');
          }
      } catch (error) {
          console.error('Error adding to cart:', error);
          alert('An error occurred while adding to cart.');
      }
  });

  // Handle "Continue" button click
  continueShoppingButton.addEventListener('click', () => {
      addToCartModal.hide(); // Close the modal and stay on the current page
  });

  // Handle "Go To Cart" button click
  goToCartButton.addEventListener('click', () => {
      window.location.href = '/cart'; // Redirect to the cart page
  });
});

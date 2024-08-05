document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.getElementById('add-to-cart');
    const productDetails = document.querySelector('.single-pro-details');
    const productId = productDetails.getAttribute('data-id');
    const quantityInput = document.getElementById('quantity');
  
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
          alert('Product added to cart!');
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
  });
  
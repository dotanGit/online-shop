document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', async function() {

        if (this.value < 0) {
            this.value = 1;
        }
        else {
            const productId = this.closest('tr').dataset.productId; // Assuming each row has data-product-id
            const quantity = this.value;

            // Send the updated quantity to the server
            await fetch('/cart/update-quantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            }); 
        }

        // Optionally, refresh the page to see the updated cart totals
        location.reload();
    });
});

document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', async function(e) {
        e.preventDefault();
        const productId = this.dataset.productId;

        const response = await fetch('/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        });

        if (response.ok) {
            // Optionally, remove the item from the DOM
            this.closest('tr').remove();
            // Or refresh the page to see the updated cart
            location.reload();
        } else {
            console.error('Failed to remove item from cart');
        }
    });
});



document.querySelector('#checkout-button').addEventListener('click', async () => {
    try {
        const response = await fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any necessary headers, like authorization if needed
            }
        });

        const result = await response.json();

        if (response.ok) {
            alert('Order placed successfully!');
            // Optionally redirect to a confirmation page or clear cart in frontend
            window.location.href = '/order-confirmation'; // Replace with actual route
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('An error occurred during checkout.');
    }
});

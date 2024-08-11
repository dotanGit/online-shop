document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', async function() {
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

        // Optionally, refresh the page to see the updated cart totals
        location.reload();
    });
});
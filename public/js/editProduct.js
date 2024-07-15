document.addEventListener('DOMContentLoaded', () => {
    const editProductButtons = document.querySelectorAll('.edit-product-btn');
    const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    const saveChangesButton = document.getElementById('saveChangesButton');

    let selectedProductId;

    editProductButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonElement = event.currentTarget;
            selectedProductId = buttonElement.getAttribute('data-product-id');
            const productName = buttonElement.getAttribute('data-product-name');
            const productPrice = buttonElement.getAttribute('data-product-price');
            const productCategory = buttonElement.getAttribute('data-product-category');

            document.getElementById('editProductName').value = productName;
            document.getElementById('editProductPrice').value = productPrice;
            document.getElementById('editProductCategory').value = productCategory;

            editProductModal.show();
        });
    });

    saveChangesButton.addEventListener('click', async () => {
        const updatedProduct = {
            name: document.getElementById('editProductName').value,
            price: document.getElementById('editProductPrice').value,
            category: document.getElementById('editProductCategory').value
        };

        try {
            const response = await fetch(`/products/${selectedProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            if (response.ok) {
                location.reload();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert('Error updating product. Please try again.');
        }
    });
});

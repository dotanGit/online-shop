document.addEventListener('DOMContentLoaded', () => {

    // Edit Product Funcuality

    const editProductButtons = document.querySelectorAll('.edit-product-btn');
    const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    const saveChangesButton = document.getElementById('saveChangesButton');
    const deleteButton = document.getElementById('deleteButton');
    
    let selectedProductId;

    editProductButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonElement = event.currentTarget;
            selectedProductId = buttonElement.getAttribute('data-product-id');
            const productName = buttonElement.getAttribute('data-product-name');
            const productPrice = buttonElement.getAttribute('data-product-price');
            const productCategory = buttonElement.getAttribute('data-product-category');
            const productDesc = buttonElement.getAttribute('data-product-description');

            document.getElementById('editProductModalLabel').innerText = "Edit Product: " + productName;
            document.getElementById('editProductName').value = productName;
            document.getElementById('editProductPrice').value = productPrice;
            document.getElementById('editProductCategory').value = productCategory;
            document.getElementById('editProductDesc').value = productDesc;


            editProductModal.show();
        });
    });

    saveChangesButton.addEventListener('click', async () => {
        const updatedProduct = {
            name: document.getElementById('editProductName').value,
            price: document.getElementById('editProductPrice').value,
            category: document.getElementById('editProductCategory').value,
            description: document.getElementById('editProductDesc').value
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


    deleteButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`/products/${selectedProductId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                location.reload();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert('Error deleting product. Please try again.');
        }
    });


    // Add Product Funcuality

    const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    const addProductBtn = document.getElementById('add-product-btn');

    addProductBtn.addEventListener('click', () => {
        addProductModal.show();
    });

    addButton.addEventListener('click', async () => {
        const newProduct = {
            name: document.getElementById('addProductName').value,
            price: document.getElementById('addProductPrice').value,
            category: document.getElementById('addProductCategory').value,
            description: document.getElementById('addProductDesc').value
        };
        

        try {
            const response = await fetch(`/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                location.reload();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert('Error adding product. Please try again.');
        }
    });

    
});

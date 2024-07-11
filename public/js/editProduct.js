document.querySelectorAll('.edit-product-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        const productPrice = this.getAttribute('data-product-price');
        const productCategory = this.getAttribute('data-product-category');
        editProduct(productId, productName, productPrice, productCategory);
    });
});

function editProduct(productId, productName, productPrice, productCategory) {
    // Fetch the categories to populate the dropdown
    fetch('/categories', {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(categories => {
        let categoryOptions = '<option value="" disabled>Select Category</option>';
        categories.forEach(category => {
            const selected = category._id === productCategory ? 'selected' : '';
            categoryOptions += `<option value="${category._id}" ${selected}>${category.name}</option>`;
        });

        Swal.fire({
            title: 'Edit Product',
            html: `
                <label for="swal-input1">Name:</label>
                <input id="swal-input1" class="swal2-input" placeholder="Product Name" value="${productName}">
                <label for="swal-input2">Price:</label>
                <input id="swal-input2" class="swal2-input" placeholder="Product Price" value="${productPrice}">
                <label for="swal-input3">Category:</label>
                <select id="swal-input3" class="swal2-input">${categoryOptions}</select>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    price: document.getElementById('swal-input2').value,
                    category: document.getElementById('swal-input3').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, price, category } = result.value;
                if (name && price && category) {
                    fetch(`/products/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: name, price: price, category: category })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update product');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.message === 'Product updated successfully') {
                            Swal.fire('Success!', 'Product updated successfully!', 'success')
                            .then(() => {
                                window.location.reload();
                            });
                        } else {
                            Swal.fire('Error!', 'Failed to update product.', 'error');
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error!', error.message, 'error');
                    });
                } else {
                    Swal.fire('Error!', 'All fields are required.', 'error');
                }
            }
        });
    })
    .catch(error => {
        Swal.fire('Error!', 'Failed to load categories.', 'error');
    });
}

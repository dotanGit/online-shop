document.getElementById('add-product-btn').addEventListener('click', function() {
    addProduct();
});


function addProduct() {
    fetch('/categories', {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(categories => {
        // Generate category options
        let categoryOptions = '<option value="" disabled selected>Select Category</option>';
        categories.forEach(category => {
            categoryOptions += `<option value="${category._id}">${category.name}</option>`;
        });

        Swal.fire({
            title: 'Add New Product',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Product Name">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Product Price">' +
                `<select id="swal-input3" class="swal2-input">${categoryOptions}</select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const price = document.getElementById('swal-input2').value;
                const category = document.getElementById('swal-input3').value;
                return { name: name, price: price, category: category };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, price, category } = result.value;
                if (name && price && category) {
                    fetch('/products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: name, price: price, category: category })
                    })
                    .then(response => {
                        if (response.ok) {
                            Swal.fire('Success!', 'Product added successfully!', 'success')
                            .then(() => {
                                window.location.reload();
                            });
                        } else {
                            Swal.fire('Error!', 'Failed to add product.', 'error');
                        }
                    });
                } else {
                    Swal.fire('Error!', 'All fields are required.', 'error');
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
        Swal.fire('Error!', 'Failed to load categories.', 'error');
    });
}
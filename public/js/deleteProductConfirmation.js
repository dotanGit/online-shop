document.querySelectorAll('.delete-product-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        confirmDeleteProduct(productId);
    });
});

function confirmDeleteProduct(productId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "The data will be lost!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/products/${productId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire(
                        'Deleted!',
                        'The product have been deleted.',
                        'success'
                    ).then(() => {
                        window.location.href = '/products';
                    });
                } else {
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the product.',
                        'error'
                    );
                }
            });
        }
    });
}

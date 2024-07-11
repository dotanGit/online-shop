document.getElementById('delete-category-btn').addEventListener('click', function (event) {
    const categoryId = event.target.getAttribute('data-category-id');
    confirmDeleteCategory(categoryId);
});


function confirmDeleteCategory(categoryId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will delete the category and all associated products!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/categories/${categoryId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire(
                        'Deleted!',
                        'The category and associated products have been deleted.',
                        'success'
                    ).then(() => {
                        window.location.href = '/categories';
                    });
                } else {
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the category.',
                        'error'
                    );
                }
            });
        }
    });
}

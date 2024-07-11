document.getElementById('add-category-btn').addEventListener('click', function(){
    addCategory();
});

function addCategory(){
    Swal.fire({
        title: 'Add New Category',
        input: 'text',
        inputPlaceholder: 'Category Name',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const categoryName = result.value;
            if (categoryName) {
                // Post the new category to the server
                fetch('/categories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: categoryName })
                })
                .then(response => {
                    if (response.ok) {
                        Swal.fire('Success!', 'Category added successfully!', 'success')
                        .then(() => {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire('Error!', 'Failed to add category.', 'error');
                    }
                });
            } else {
                Swal.fire('Error!', 'Category name cannot be empty.', 'error');
            }
        }
    });
}

document.querySelectorAll('.edit-category-btn').forEach(button => {
    button.addEventListener('click', function() {
        const categoryId = this.getAttribute('data-category-id');
        const categoryName = this.getAttribute('data-category-name');
        editCategory(categoryId, categoryName);
    });
});

function editCategory(categoryId, categoryName) {
    Swal.fire({
        title: 'Edit Category',
        input: 'text',
        inputValue: categoryName,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const newName = result.value;
            if (newName) {
                fetch(`/categories/${categoryId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: newName })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update category');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.message === 'Category updated successfully') {
                        Swal.fire('Success!', 'Category updated successfully!', 'success')
                        .then(() => {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire('Error!', 'Failed to update category.', 'error');
                    }
                })
                .catch(error => {
                    Swal.fire('Error!', error.message, 'error');
                });
            } else {
                Swal.fire('Error!', 'Category name cannot be empty.', 'error');
            }
        }
    });
}
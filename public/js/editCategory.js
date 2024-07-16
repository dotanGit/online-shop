document.addEventListener('DOMContentLoaded', () => {
    // Edit Category Functionality
    const editCategoryButtons = document.querySelectorAll('.edit-category-btn');
    const editCategoryModal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
    const saveChangesButton = document.getElementById('saveChangesButton');
    const deleteButton = document.getElementById('deleteButton');

    let selectedCategoryId;
    let originalCategoryName;

    editCategoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonElement = event.currentTarget;
            selectedCategoryId = buttonElement.getAttribute('data-category-id');
            originalCategoryName = buttonElement.getAttribute('data-category-name');

            document.getElementById('editCategoryModalLabel').innerText = "Edit Category: " + originalCategoryName;
            document.getElementById('editCategoryName').value = originalCategoryName;

            editCategoryModal.show();
        });
    });

    saveChangesButton.addEventListener('click', async () => {
        const updatedCategory = {
            name: document.getElementById('editCategoryName').value
        };

        try {
            const response = await fetch(`/categories/${selectedCategoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCategory)
            });

            if (response.ok) {
                location.reload();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert('Error updating category. Please try again.');
        }
    });

    deleteButton.addEventListener('click', () => {
        const modalBody = document.querySelector('#editCategoryModal .modal-body');
        const originalContent = modalBody.innerHTML;
        const modalFooter = document.querySelector('#editCategoryModal .modal-footer');
        
        // Hide the original buttons and display the new html
        modalFooter.style.display = 'none';
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2 style="color: red;">Warning!</h2>
                <h4>This category may have related products. Deleting this category means deleting all the products that are connected to it.</h4>
                <button id="confirmDeleteButton" class="btn btn-danger" style="margin: 10px;">Yes, Delete</button>
                <button id="cancelDeleteButton" class="btn btn-secondary" style="margin: 10px;">Cancel</button>
            </div>
        `;
        
        document.getElementById('confirmDeleteButton').addEventListener('click', async () => {
            try {
                const response = await fetch(`/categories/${selectedCategoryId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    location.reload();
                } else {
                    // Revert to original content and reset input value on error
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                    modalBody.innerHTML = originalContent;
                    document.getElementById('editCategoryName').value = originalCategoryName;
                    modalFooter.style.display = 'flex';
                }
            } catch (error) {
                // Revert to original content and reset input value on error
                alert('Error deleting category. Please try again.');
                modalBody.innerHTML = originalContent;
                document.getElementById('editCategoryName').value = originalCategoryName;
                modalFooter.style.display = 'flex';
            }
        });


        // Revert to original content and reset input value if canceled
        document.getElementById('cancelDeleteButton').addEventListener('click', () => {
            modalBody.innerHTML = originalContent;
            document.getElementById('editCategoryName').value = originalCategoryName;
            modalFooter.style.display = 'flex';
        });
    });



    // Add Category Funcuality

    const addCategoryModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
    const addCategoryBtn = document.getElementById('add-category-btn');

    addCategoryBtn.addEventListener('click', () => {
        addCategoryModal.show();
    });

    addButton.addEventListener('click', async () => {
        const newCategory = {
            name: document.getElementById('addCategoryName').value
        };
        

        try {
            const response = await fetch(`/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
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

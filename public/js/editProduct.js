document.addEventListener('DOMContentLoaded', function() {
    // Select all edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    
    // Iterate through each button and add a click event listener
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Capture the data attributes
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = this.dataset.productPrice;
            const productCategory = this.dataset.productCategory;
            
            // Use the captured data as needed
            console.log('Product ID:', productId);
            console.log('Product Name:', productName);
            console.log('Product Price:', productPrice);
            console.log('Product Category:', productCategory);

            // Example: Populate a form with the captured data
            // document.getElementById('product-id').value = productId;
            // document.getElementById('product-name').value = productName;
            // document.getElementById('product-price').value = productPrice;
            // document.getElementById('product-category').value = productCategory;

            // Show the modal
            const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
            editProductModal.show();
        });
    });
});
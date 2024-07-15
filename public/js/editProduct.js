document.querySelectorAll('.edit-product-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        const productPrice = this.getAttribute('data-product-price');
        const productCategory = this.getAttribute('data-product-category');
        editProduct(productId, productName, productPrice, productCategory);
    });
});
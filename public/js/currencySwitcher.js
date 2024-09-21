async function changeCurrency() {
    const currency = document.getElementById('currency').value;

    try {
        // Fetch exchange rates from the backend
        const response = await fetch(`/shop/currency?currency=${currency}`);
        const data = await response.json();

        if (data.success) {
            // Loop through the product list and update prices
            data.products.forEach(product => {
                const priceElement = document.getElementById(`price-${product._id}`);
                console.log('symbol:', data.symbol);
                if (priceElement) {
                    priceElement.innerHTML = `${product.symbol}${product.convertedPrice.toFixed(2)}`;
                }
            });
        }
    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
}

// Add event listener to the currency dropdown
document.getElementById('currency').addEventListener('change', changeCurrency);
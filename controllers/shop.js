const productService = require('../services/products');
const categoryService = require('../services/category');
const axios = require('axios');

const getProducts = async (req, res) => {
    let products;
    const categories = await categoryService.getAllCategories();
    let selectedCategoryName = 'All Categories';
    let selectedGender = req.query.gender || '';
    let selectedMaxPrice = req.query.maxPrice || '';

    const filter = {};

    // Filter by category if selected
    if (req.query.category) {
        const selectedCategory = await categoryService.getCategoryById(req.query.category);
        selectedCategoryName = selectedCategory.name;
        filter.category = req.query.category;
    }

    // Filter by gender if selected
    if (selectedGender) {
        filter.gender = selectedGender;
    }

    // Filter by maximum price (convert string price to number for comparison)
    if (selectedMaxPrice) {
        filter.$expr = {
            $lte: [{ $toDouble: "$price" }, parseFloat(selectedMaxPrice)]
        };
    }

    products = await productService.getFilteredProducts(filter);

    res.render('shop', { 
        products, 
        categories, 
        selectedCategoryName, 
        selectedGender, 
        selectedMaxPrice 
    });
};

// Function to convert currency and return converted prices
const convertCurrency = async (req, res) => {
    const { currency } = req.query;
    
    try {
        const apiKey = 'eb9858a6e3adb6d889bf924d'; // Personal API
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
        const rates = response.data.rates;

        // Convert the prices of products based on the exchange rate
        const products = await productService.getFilteredProducts({});
        const convertedProducts = products.map(product => ({
            _id: product._id,
            convertedPrice: product.price * rates[currency],
            symbol: currencySymbol(currency) // Helper function for currency symbols
        }));

        res.json({ success: true, products: convertedProducts });
    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
};

// Helper function to get currency symbols
function currencySymbol(currency) {
    const symbols = {
        USD: '$',
        ILS: "₪",
        EUR: '€',
        GBP: '£',
    };
    return symbols[currency] || currency;
}


module.exports = {
    getProducts,
    convertCurrency
};
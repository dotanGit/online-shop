const orderService = require('../services/order');

async function checkout(req, res) {
    const userId = req.session.username;

    try {
        const order = await orderService.createOrder(userId);
        res.status(200).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getOrderHistory(req, res) {
    const userId = req.session.username;

    try {
        const orders = await Order.find({ userId: userId }).sort({ orderDate: -1 });  // Fetch orders sorted by date
        res.render('account', { orders: orders });
    } catch (error) {
        console.error(error);
    }
}

async function getOrderDetails(req, res) {
    const orderId = req.params.orderId;

    try {
        
        const order = await orderService.getOrderById(orderId);
        res.render('order-details', { order: order });
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
}

async function getAllOrders(req, res) {
    try {
        // Fetch all orders
        const orders = await orderService.getAllOrders();

        // Initialize variables for revenue, items sold, and product popularity
        let totalRevenue = 0;
        let totalItemsSold = 0;
        const productSales = {}; // To track product sales by quantity
        const monthlyRevenue = {};

        // Helper to format dates as YYYY-MM
        const formatDateToMonthYear = (date) => {
            const formatter = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit'
            });
            const [{ value: month }, , { value: year }] = formatter.formatToParts(date);
            return `${year}-${month}`;
        };

        // Loop through each order
        orders.forEach(order => {
            totalRevenue += parseFloat(order.total);

            // Sum up the quantity of each item in the order
            order.items.forEach(item => {
                totalItemsSold += parseInt(item.quantity);

                // Track product sales for most popular product
                if (!productSales[item.productId]) {
                    productSales[item.productId] = {
                        name: item.name,
                        quantity: 0
                    };
                }
                productSales[item.productId].quantity += parseInt(item.quantity);
            });

            // Properly format the order date to "YYYY-MM"
            const orderMonth = formatDateToMonthYear(new Date(order.orderDate));
            
            if (!monthlyRevenue[orderMonth]) {
                monthlyRevenue[orderMonth] = 0;
            }
            monthlyRevenue[orderMonth] += parseFloat(order.total);
        });

        // Determine the most popular product by quantity sold
        let mostPopularProduct = null;
        let maxQuantity = 0;

        for (const productId in productSales) {
            if (productSales[productId].quantity > maxQuantity) {
                mostPopularProduct = productSales[productId].name;
                maxQuantity = productSales[productId].quantity;
            }
        }

        // Convert the monthlyRevenue object into arrays of labels and data
        const monthlyLabels = Object.keys(monthlyRevenue);
        const monthlyData = Object.values(monthlyRevenue);

        // Render the page with the calculated data
        res.render('order', { 
            orders: orders, 
            totalRevenue: totalRevenue.toFixed(2), 
            totalItemsSold: totalItemsSold, 
            mostPopularProduct: mostPopularProduct || 'No products sold yet',  // Pass most popular product
            monthlyLabels: JSON.stringify(monthlyLabels),  // Pass as JSON string to safely use in JS
            monthlyData: JSON.stringify(monthlyData)
        });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    checkout,
    getOrderHistory,
    getOrderDetails,
    getAllOrders
};

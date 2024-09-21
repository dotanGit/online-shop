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

        // Loop through each order
        orders.forEach(order => {
            totalRevenue += parseFloat(order.total);
            
            // Sum up the quantity of each item in the order
            order.items.forEach(item => {
                totalItemsSold += parseInt(item.quantity);

                // Track product sales
                if (!productSales[item.productId]) {
                    productSales[item.productId] = {
                        name: item.name,
                        quantity: 0
                    };
                }
                productSales[item.productId].quantity += parseInt(item.quantity);
            });
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

        // Render the page with orders, total revenue, total items sold, and the most popular product
        res.render('order', { 
            orders: orders, 
            totalRevenue: totalRevenue.toFixed(2), 
            totalItemsSold: totalItemsSold, 
            mostPopularProduct: mostPopularProduct || 'No products sold yet' // Fallback if no orders
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

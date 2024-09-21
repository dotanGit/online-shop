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
        res.status(500).json({ message: 'Unable to retrieve order history' });
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

module.exports = {
    checkout,
    getOrderHistory,
    getOrderDetails
};

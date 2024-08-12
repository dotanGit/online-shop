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

module.exports = {
    checkout
};

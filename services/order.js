const Order = require('../models/order');
const User = require('../models/User');

async function createOrder(userId) {
    const user = await User.findById(userId);

    if (!user || user.cart.length === 0) {
        throw new Error('No items in cart');
    }

    const order = new Order({
        userId: user._id,
        items: user.cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        })),
        total: user.cart.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    });

    await order.save();

    // Clear user's cart and save order ID
    user.cart = [];
    user.orders.push(order._id);
    await user.save();

    return order;
}

module.exports = {
    createOrder
};

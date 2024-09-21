const Order = require('../models/order');
const User = require('../models/User');
const Product = require('../models/products'); // Assuming you have a Product model

async function createOrder(userName) {
    const user = await User.findById(userName);

    if (!user || user.cart.length === 0) {
        throw new Error('No items in cart');
    }

    let total = 0;
    const orderItems = [];

    // Fetch the price of each product in the cart
    for (const cartItem of user.cart) {
        const product = await Product.findById(cartItem.productId); // Fetch product details
        if (!product) {
            throw new Error(`Product with ID ${cartItem.productId} not found`);
        }

        const price = Number(product.price);
        const quantity = Number(cartItem.quantity);

        // Add to the total
        total += quantity * price;

        // Push to order items
        orderItems.push({
            productId: cartItem.productId,
            image: product.image,
            name: product.name,
            gender: product.gender,
            quantity: quantity,
            price: price
        });
    }

    const order = new Order({
        userId: userName,
        items: orderItems,
        total: total
    });

    await order.save();

    // Clear user's cart and save order ID
    user.cart = [];
    user.orders.push(order._id);
    await user.save();

    return order;
}

async function getOrderHistoryByUserId(userId) {
    try {
        const orders = await Order.find({ userId: userId }).sort({ orderDate: -1 });
        return orders;  // Return the fetched orders
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Error fetching orders');
    }
}

async function getOrderById(orderId) {
    try {
        const order = await Order.findById(orderId);
        return order;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw new Error('Error fetching order');
    }
}

module.exports = {
    createOrder,
    getOrderHistoryByUserId,
    getOrderById
};

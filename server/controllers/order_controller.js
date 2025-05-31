import Order from '../models/order.js';

// פונקציה למחיקת הזמנה  
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await Order.findByIdAndDelete(id);
        res.send('Order deleted successfully');
    } catch (err) {
        res.status(400).send('Error deleting order');
    }
};

// פונקציה לעדכון פרטי הזמנה  
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { product, quantity } = req.body;
    try {
        await Order.findByIdAndUpdate(id, { product, quantity });
        res.send('Order details updated successfully');
    } catch (err) {
        res.status(400).send('Error updating order details');
    }
};

// פונקציה להוספת הזמנה חדשה  
export const addOrder = async (req, res) => {
    const { userId, products, totalAmount } = req.body;

    const newOrder = new Order({
        user: userId,
        products: products,
        totalAmount: totalAmount  
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).send('Error adding new order');
    }
};

// פונקציה להצגת כל ההזמנות  
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(400).send('Error getting all orders');
    }
};
// ניתן להוסיף פונקציות נוספות כגון יצירת הזמנה, קבלת פרטי הזמנה וכדומה

// module.exports = {
//     deleteOrder,
//     updateOrder,
//     getAllOrders
// };
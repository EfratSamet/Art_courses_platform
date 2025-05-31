import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true  
    }],
    totalPrice: {
        type: Number,
        required: true  
    },
    orderDate: {
        type: Date,
        default: Date.now  
    },
    orderCode: {
        type: String,
        required: true  
    },
    studentCode: {
        type: String,
        required: true  
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true  
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
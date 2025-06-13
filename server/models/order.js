import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      name: String,
      price: Number
    }
  ],
  totalAmount: Number,
  fullName: String,
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

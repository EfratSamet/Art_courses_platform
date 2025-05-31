// routes/order.js
import express from'express';
import { 
           deleteOrder, 
           addOrder, 
           getAllOrders, 
           updateOrder 
       } from'../controllers/order_controller.js';
const router = express.Router();
// Route to get all orders
router.get('/', getAllOrders);

// Route to add a new order
router.post('/', addOrder);

// Route to update an existing order
router.put('/:id', updateOrder);

// Route to delete an order
router.delete('/:id', deleteOrder);

export{router};

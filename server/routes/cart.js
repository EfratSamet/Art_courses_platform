import express from 'express';
import { 
         removeFromCart, 
         getCart, 
         addToCart, 
         updateCourseInCart 
        } from '../controllers/cart_controller.js';
const router = express.Router();

// Route to get all items in the cart
router.get('/', getCart);

// Route to add a new item to the cart
router.post('/', addToCart);

// Route to update an existing item in the cart
router.put('/:id', updateCourseInCart);

// Route to delete an item from the cart
router.delete('/:id', removeFromCart);

export{router};

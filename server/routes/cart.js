import express from 'express';
import {
  removeFromCart,
  getCart,
  addToCart,
  updateCourseInCart,
  checkoutCart
} from '../controllers/cart_controller.js';

const router = express.Router();

// שליפת עגלה לפי userId
router.get('/:userId', getCart);

// הוספה לעגלה
router.post('/add', addToCart);

// עדכון קורס בעגלה (אם תתממש בעתיד)
router.put('/:id', updateCourseInCart);

// הסרת קורס מהעגלה
router.delete('/remove', removeFromCart);
// ביצוע רכישה בפועל
router.post('/checkout', checkoutCart);

export { router };

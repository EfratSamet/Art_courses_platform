import Cart from '../models/cart.js';
import Course from '../models/course.js';
import Order from '../models/order.js';

import mongoose from 'mongoose';
// שליפת עגלה לפי userId
export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate('courses');
    if (!cart) return res.json([]);
    res.json(cart.courses); // מחזיר מערך של אובייקטים של קורסים
  } catch (err) {
    console.error("❌ שגיאה בשליפת עגלה:", err);
    res.status(500).send('Error getting cart');
  }
};


// הוספת קורס לעגלה
export const addToCart = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
console.log({ userId, courseId });
console.log("הוספה לעגלה – נתונים שהתקבלו:", req.body);

    if (!userId || !courseId) {
      return res.status(400).send('userId and courseId are required');
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const course = await Course.findById(courseObjectId);
    if (!course) return res.status(404).send('Course not found');

    let cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) {
      cart = new Cart({ userId: userObjectId, courses: [courseObjectId] });
    } else {
      if (!cart.courses.some(id => id.equals(courseObjectId))) {
        cart.courses.push(courseObjectId);
      }
    }

    await cart.save();
    res.status(200).send('Course added to cart');
  } catch (err) {
    console.error("❌ שגיאה בהוספה לעגלה:", err.message);
    res.status(500).send('Error adding to cart');
  }
};

// הסרה מהעגלה
export const removeFromCart = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send("Cart not found");

cart.courses = cart.courses.filter(id => id.toString() !== courseId);
    await cart.save();

    res.send('Course removed from cart');
  } catch (err) {
    console.error("❌ שגיאה בהסרת קורס מהעגלה:", err);
    res.status(500).send('Error removing course from cart');
  }
};

// עדכון (אופציונלי – אם הקורסים הם אובייקטים)
export const updateCourseInCart = async (req, res) => {
  const { userId, courseId, newCourseDetails } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send('Cart not found');

    const courseIndex = cart.courses.findIndex(id => id === courseId);
    if (courseIndex === -1) return res.status(404).send('Course not found in cart');

    // כאן תוכל/י לעדכן אם cart.courses[] כולל אובייקטים ולא רק מזהים
    res.json({ message: 'Update logic not implemented because courses are IDs' });
  } catch (err) {
    console.error("❌ שגיאה בעדכון קורס:", err);
    res.status(500).send('Error updating course in cart');
  }
};

// ביצוע רכישה בפועל ושמירת הזמנה במסד הנתונים
export const checkoutCart = async (req, res) => {
  try {
    const { userId, fullName, cardNumber, expiry, cvv } = req.body;

    if (!userId || !fullName || !cardNumber || !expiry || !cvv) {
      return res.status(400).send('חסרים פרטים לרכישה');
    }

    const cart = await Cart.findOne({ userId }).populate('courses');
    if (!cart || cart.courses.length === 0) {
      return res.status(400).send('העגלה ריקה');
    }

    // חישוב מחיר כולל
    const totalAmount = cart.courses.reduce((sum, course) => sum + course.price, 0);

    // יצירת קוד הזמנה אקראי (למשל)
    const orderCode = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    // יצירת הזמנה חדשה
    const order = new Order({
      user: userId,
      products: cart.courses.map(course => ({
        courseId: course._id,
        name: course.name,
        price: course.price
      })),
      totalAmount,
      fullName,
      purchaseDate: new Date(),
      orderCode
    });

    await order.save();

    // ריקון העגלה
    cart.courses = [];
    await cart.save();

    res.send('✅ הרכישה הושלמה והוזמנה נשמרה בהצלחה');
  } catch (err) {
    console.error('❌ שגיאה בביצוע רכישה:', err);
    res.status(500).send('שגיאה בעת ביצוע הרכישה');
  }
};
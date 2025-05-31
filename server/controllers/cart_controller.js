import Cart from '../models/cart.js';

// פונקציה להצגת סל הקניות של משתמש מסוים  
export const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ user: userId });
        res.json(cart);
    } catch (err) {
        res.status(400).send('Error getting cart');
    }
};

// פונקציה להוספת מוצר לסל הקניות  
export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [{ product: productId, quantity: quantity }] });
        } else {
            cart.items.push({ product: productId, quantity: quantity });
        }
        await cart.save();
        res.send('Product added to cart successfully');
    } catch (err) {
        res.status(400).send('Error adding product to cart');
    }
};

// פונקציה למחיקת מוצר מסל הקניות 

export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ user: userId });
        cart.items = cart.items.filter(item => item.product !== productId);
        await cart.save();
        res.send('Product removed from cart successfully');
    } catch (err) {
        res.status(400).send('Error removing product from cart');
    }
};

// פונקציה לעדכון קורס בסל הקניות של משתמש מסוים  
export const updateCourseInCart = async (req, res) => {
    const { userId, courseId, newCourseDetails } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const courseToUpdate = cart.courses.find(course => course.courseId === courseId);

        if (!courseToUpdate) {
            return res.status(404).send('Course not found in cart');
        }

        // עדכון פרטי הקורס בסל הקניות  
        courseToUpdate.name = newCourseDetails.name;
        courseToUpdate.price = newCourseDetails.price;
        // לעדכון נוסף של שדות אחרים בקורס

        await cart.save();
        res.json({ message: 'Course updated in cart' });
    } catch (err) {
        res.status(400).send('Error updating course in cart');
    }
};
// module.exports = {
//     getCart,
//     addToCart,
//     removeFromCart  
// };
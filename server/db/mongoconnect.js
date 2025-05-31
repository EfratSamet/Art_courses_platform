import mongoose from 'mongoose';

// הגדרת הפונקציה לחיבור למסד הנתונים
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://Efrat:5603@cluster0.la7xl5l.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// ייצוא הפונקציה
export default connectToDatabase;
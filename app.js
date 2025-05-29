import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as login } from './server/routes/login.js';
import {router as admin } from './server/routes/admin.js';
import {router as cart } from './server/routes/cart.js';
import {router as course } from './server/routes/course.js';
import {router as order} from './server/routes/order.js';
import {router as student} from './server/routes/student.js';
import {router as teacher} from './server/routes/teacher.js';
import session from 'express-session';
import mongoose from 'mongoose';
//import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();
//import bcrypt from 'bcryptjs';
const port = 3000;
const app = express(); // הוספת הגדרת app
app.use(bodyParser.json());
console.log(process.env.JWT_SECRET_KEY)

// הגדרת Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key', // סוד לחתימה על ה-session. תחליף במשהו חזק יותר בפרודקשן.
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // באפשרותך לשנות ל-true אם אתה משתמש ב-HTTPS
}));

// הגדרת מנוע תבניות
app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/login", login);
app.use('/cart', cart);
app.use('/admin', admin);
app.use('/order', order);
app.use('/teacher', teacher);
app.use('/student', student);
app.use('/course', course);

// חיבור למסד נתונים
import('./server/db/mongoconnect.js');

/*// המערכת תסגר כל יום מוצאי שבת בחצות
cron.schedule('0 0 * * 0', () => {
  console.log('פעולה מתבצעת!');
  
});

console.log('המשימה מתוזמנת לפעולה כל שבוע ביום ראשון בשעה 10:00');
*/

// השקת השרת
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
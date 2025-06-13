import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { router as login } from './server/routes/login.js';
import { router as admin } from './server/routes/admin.js';
import { router as cart } from './server/routes/cart.js';
import { router as course } from './server/routes/course.js';
import { router as order } from './server/routes/order.js';
import { router as student } from './server/routes/student.js';
import { router as teacher } from './server/routes/teacher.js';

import session from 'express-session';
import dotenv from 'dotenv';
import connectToDatabase from './server/db/mongoconnect.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// תמיכה ב־session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// הגדרת סטטיים
app.use(express.static(path.join(__dirname, 'client'))); // מגיש את register.html

// ראוטים
app.use("/login", login);
app.use('/cart', cart);
app.use('/admin', admin);
app.use('/order', order);
app.use('/teacher', teacher);
app.use('/student', student);
app.use('/course', course);

// ברירת מחדל: הצגת דף ההרשמה
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'client','html', 'login.html'));
});

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

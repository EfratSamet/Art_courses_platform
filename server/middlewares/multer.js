import multer from 'multer';

// שמירת הקבצים בזיכרון (נשלחים ל-Cloudinary מיד לאחר מכן)
const storage = multer.memoryStorage();

export const upload = multer({ storage });

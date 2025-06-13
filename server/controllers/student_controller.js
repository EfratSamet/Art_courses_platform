import Student from '../models/student.js';
import bcrypt from 'bcryptjs';
// פונקציה למחיקת תלמיד  
export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        await Student.findByIdAndDelete(id);
        res.send('Student deleted successfully');
    } catch (err) {
        res.status(400).send('Error deleting student');
    }
};

// פונקציה לעדכון פרטי תלמיד  
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, grade } = req.body;
    try {
        await Student.findByIdAndUpdate(id, { name, grade });
        res.send('Student details updated successfully');
    } catch (err) {
        res.status(400).send('Error updating student details');
    }
};

// פונקציה להוספת תלמיד חדש  
export const addStudent = async (req, res) => {
  const { name, email, password, idNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // הצפנה

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      idNumber
    });
  console.log('Request body:', req.body); // 🪵 הדפסה

    await student.save();
    res.redirect('/html/catalog.html'); // ניתוב לאחר הרשמה
  } catch (err) {
  console.error('Registration error:', err);

  let errorMessage = 'אירעה שגיאה במהלך ההרשמה';
  if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
    errorMessage = 'כתובת הדוא״ל כבר קיימת במערכת';
  }

  res.redirect(`/html/register.html?error=${encodeURIComponent(errorMessage)}`);
}

};


// פונקציה להצגת כל התלמידים  
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(400).send('Error getting all students');
    }
};


// ניתן להוסיף פונקציות נוספות כגון יצירת תלמיד, קבלת פרטי תלמיד וכדומה

// module.exports = {
//     deleteStudent,
//     updateStudent  
// };
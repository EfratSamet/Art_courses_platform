import Student from '../models/student.js';

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
    const { name, age, grade } = req.body;
    
    const newStudent = new Student({
        name: name,
        age: age,
        grade: grade  
    });

    try {
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).send('Error adding new student');
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
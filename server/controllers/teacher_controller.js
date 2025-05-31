import Teacher from '../models/teacher.js';

// פונקציה למחיקת מורה  
export const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        await Teacher.findByIdAndDelete(id);
        res.send('Teacher deleted successfully');
    } catch (err) {
        res.status(400).send('Error deleting teacher');
    }
};
// פונקציה להוספת מורה חדש  
export const addTeacher = async (req, res) => {
    const { name, subject, experience } = req.body;
    
    const newTeacher = new Teacher({
        name: name,
        subject: subject,
        experience: experience  
    });

    try {
        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (err) {
        res.status(400).send('Error adding new teacher');
    }
};

// פונקציה להצגת כל המורים  
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(400).send('Error getting all teachers');
    }
};
// פונקציה לעדכון פרטי מורה  
export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { name, subject } = req.body;
    try {
        await Teacher.findByIdAndUpdate(id, { name, subject });
        res.send('Teacher details updated successfully');
    } catch (err) {
        res.status(400).send('Error updating teacher details');
    }
};

// ניתן להוסיף פונקציות נוספות כגון יצירת מורה, קבלת פרטי מורה וכדומה

// module.exports = {
//     deleteTeacher,
//     updateTeacher  
// };
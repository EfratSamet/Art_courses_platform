import Course from '../models/course.js';

// פונקציה להצגת רשימת כל הקורסים  
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(400).send('Error getting courses');
    }
};

// פונקציה להוספת קורס חדש  
export const addCourse = async (req, res) => {
    const { name, description, price } = req.body;
    const newCourse = new Course({ name, description, price });
    try {
        await newCourse.save();
        res.send('Course added successfully');
    } catch (err) {
        res.status(400).send('Error adding course');
    }
};

// פונקציה לעדכון פרטי קורס  
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        await Course.findByIdAndUpdate(id, { name, description, price });
        res.send('Course details updated successfully');
    } catch (err) {
        res.status(400).send('Error updating course details');
    }
};

// פונקציה למחיקת קורס  
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        await Course.findByIdAndDelete(id);
        res.send('Course deleted successfully');
    } catch (err) {
        res.status(400).send('Error deleting course');
    }
};

// module.exports = {
//     getAllCourses,
//     addCourse,
//     updateCourse,
//     deleteCourse  
// };
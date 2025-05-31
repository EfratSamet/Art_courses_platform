// routes/teacher.js
import express from'express';
import { 
       deleteTeacher, 
       addTeacher, 
       getAllTeachers, 
       updateTeacher 
} from'../controllers/teacher_controller.js';
const router = express.Router();
// Route to get all teachers
router.get('/', getAllTeachers);

// Route to add a new teacher
router.post('/', addTeacher);

// Route to update an existing teacher
router.put('/:id', updateTeacher);

// Route to delete a teacher
router.delete('/:id', deleteTeacher);

export{router};

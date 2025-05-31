import express from'express';
import { 
          deleteStudent, 
          addStudent, 
          getAllStudents, 
          updateStudent 
       } from'../controllers/student_controller.js';
const router = express.Router();
// Route to get all students
router.get('/', getAllStudents);

// Route to add a new student
router.post('/', addStudent);

// Route to update an existing student
router.put('/:id', updateStudent);

// Route to delete a student
router.delete('/:id', deleteStudent);

export{router};

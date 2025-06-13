import Course from '../models/course.js';
import express from 'express';
import { 
           deleteCourse, 
           addCourse, 
           getAllCourses, 
           updateCourse,
           getCourseById
       } from'../controllers/course_controller.js';
const router = express.Router();
// Route to get all courses
router.get('/', getAllCourses);

// Route to add a new course
router.post('/', addCourse);

// Route to update an existing course
router.put('/:id', updateCourse);

// Route to delete a course
router.delete('/:id', deleteCourse);
router.get('/:id', getCourseById); 
export{router};

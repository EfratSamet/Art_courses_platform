import express from 'express';
<<<<<<< HEAD
// import admin from '../controllers/admin_controller.js'
// import student from '../controllers/student_controller.js'
=======
import admin from '../controllers/admin_controller.js'
import student from '../controllers/student_controller.js'
>>>>>>> b9d4caff5ff1da30979d9245d239abc559d22983
import { 
    deleteAdmin, 
    createAdmin, 
    getAdminDetails, 
    updateAdmin 
} from '../controllers/admin_controller.js';
const router = express.Router();
// Route to get all admins
router.get('/', getAdminDetails);

// Route to add a new admin
router.post('/', createAdmin);

// Route to update an existing admin
router.put('/:id', updateAdmin);

// Route to delete an admin
router.delete('/:id', deleteAdmin);

export{router};

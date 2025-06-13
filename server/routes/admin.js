import express from 'express';
// import admin from '../controllers/admin_controller.js'
// import student from '../controllers/student_controller.js'


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

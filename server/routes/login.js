import express from 'express'
import {
    addUser,
    loginUser,
    logoutUser,
    deleteUser,
    loginDirec,
    logoutDirec
} from '../controllers/login_controllers.js';

const router = express.Router();

//user register
router.post('/addUser', addUser);
//user login
router.post('/loginUser', loginUser);
//user logout
router.post('/logoutUser', logoutUser);
//delete user
router.delete('/deleteUser',deleteUser);

//director login
router.post('/loginDirec', loginDirec);
//director logout
router.post('/logoutDirec', logoutDirec);


export{router};
import express from 'express';
import { login } from '../controllers/login_controllers.js';

const router = express.Router();

// משתמש מתחבר ומקבל טוקן
router.post('/', login);
router.post('/login', login);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/html/login.html'));
});

export { router };

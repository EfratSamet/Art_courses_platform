import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from '../models/student.js';

const SECRET = process.env.JWT_SECRET || 'mySecretKey';

export const login = async (req, res) => {

  const { email, password } = req.body;

const user = await Student.findOne({ email });

if (!user) {
  
  console.log("User not found for email:", email);
  return res.status(401).send('User not found');
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  console.log("Password mismatch for user:", email);
  return res.status(401).send('Invalid credentials');
}

const token = jwt.sign({ userId: user._id, name: user.name }, SECRET, { expiresIn: '1d' });
  res.json({ token, userId: user._id });
};

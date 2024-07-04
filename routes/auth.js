import express from 'express';
import { registerUser, loginUser } from '../endpoint/controller/userController.js';
import authenticateToken from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', authenticateToken, registerUser);
router.post('/login', loginUser);

export default router;
// controllers/userController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

export const registerUser = async (req, res) => {
  const { userName, password, idBar } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db.Utilisateur.create({
      userName,
      password_hash: hashedPassword,
      idBar,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await db.Utilisateur.findOne({ where: { userName } });

    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ id: user.id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

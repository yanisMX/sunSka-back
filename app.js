// app.js
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, SunSka!');
});

// Route pour créer un utilisateur
app.post('/users', async (req, res) => {
  const { username, password, idBar } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db.Utilisateur.create({
      username,
      password_hash: hashedPassword,
      idBar
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour authentifier un utilisateur
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.Utilisateur.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

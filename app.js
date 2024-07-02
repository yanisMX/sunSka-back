import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import authenticateToken from './middlewares/auth.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, SunSka!');
});

// Routes d'authentification
app.use('/auth', authRoutes);

// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
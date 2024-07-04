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

app.use('/bar', barRoutes);
app.use('/entree', entreeRoutes);
app.use('/produit', produitRoutes);
app.use('/sortie', sortieRoutes);
app.use('/stick', stockRoutes);

// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
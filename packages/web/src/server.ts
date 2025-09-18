import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuration des logs
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
  next();
});

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Route d'accueil
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(cors());
app.use(express.json());

// Routes de base
app.get('/api/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

// Routes
import routes from './routes';
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
import { Router } from 'express';

const router = Router();

// Route de test
router.get('/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

export default router;
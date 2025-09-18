import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/express';

export function errorHandler(err: Error, _req: AuthRequest, res: Response, _next: NextFunction) {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
}
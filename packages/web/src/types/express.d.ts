import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface RegisterBody extends LoginBody {
  role: string;
}
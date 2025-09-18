import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret'
);

export interface AuthResult {
  success: boolean;
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

export async function verifyAuth(req: Request): Promise<AuthResult> {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return { success: false };
    }

    const token = authHeader.split(' ')[1];
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return {
      success: true,
      user: {
        id: payload.id as number,
        username: payload.username as string,
        role: payload.role as string,
      },
    };
  } catch (error) {
    console.error('Erreur vérification auth:', error);
    return { success: false };
  }
}

export async function createToken(user: { id: number; username: string; role: string }) {
  try {
    const token = await new SignJWT({ id: user.id, username: user.username, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(JWT_SECRET);

    return token;
  } catch (error) {
    console.error('Erreur création token:', error);
    throw error;
  }
}
import { NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Erreur login:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
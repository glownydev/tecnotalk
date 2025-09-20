import { NextResponse } from 'next/server';

interface AdminLoginRequest {
  password: string;
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // À configurer dans les variables d'environnement

export async function POST(req: Request) {
  try {
    const data = await req.json() as AdminLoginRequest;
    const { password } = data;

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Mot de passe incorrect' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erreur authentification admin:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
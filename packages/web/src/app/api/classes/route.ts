import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const classes = await prisma.class.findMany({
      include: {
        students: true
      }
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error('Erreur classes:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    
    const newClass = await prisma.class.create({
      data: { name }
    });

    return NextResponse.json(newClass);
  } catch (error) {
    console.error('Erreur création classe:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
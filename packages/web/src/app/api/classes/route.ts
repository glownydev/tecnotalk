import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { ClassCreateRequest, ClassResponse } from '@/types/class';

export async function GET() {
  const classes = await prisma.class.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });
  return NextResponse.json(classes satisfies ClassResponse[]);
}

export async function POST(req: Request) {
  try {
    const { name } = (await req.json()) as ClassCreateRequest;
    
    const newClass = await prisma.class.create({
      data: { name },
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    });    return NextResponse.json(newClass);
  } catch (error) {
    console.error('Erreur création classe:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
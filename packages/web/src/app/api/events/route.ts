import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { EventCreateRequest } from '@/types/event';
import { EventType } from '@/types/event';

export async function POST(req: Request) {
  try {
    const data = await req.json() as { studentId: string; authorId: string; type: EventType; comment?: string };
    const studentId = parseInt(data.studentId);
    const authorId = parseInt(data.authorId);
    const { type, comment } = data;
    
    // Calcul des points selon le type
    let points = 0;
    switch (type) {
      case 'pos':
        points = 1;
        break;
      case 'neg':
        points = -1;
        break;
      case 'croix':
        points = -10;
        break;
    }

    const event = await prisma.event.create({
      data: {
        studentId,
        type,
        points,
        comment,
        authorId
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Erreur création événement:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
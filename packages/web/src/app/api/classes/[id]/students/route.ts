import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const classId = parseInt(params.id);
    const students = await prisma.student.findMany({
      where: { classId },
      include: {
        events: true
      }
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Erreur élèves:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
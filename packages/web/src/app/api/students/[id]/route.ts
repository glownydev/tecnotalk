import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await verifyAuth(req);
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const studentId = parseInt(params.id);
    
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        events: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        class: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Élève non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Erreur GET /students/:id:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
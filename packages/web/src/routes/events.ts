import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtenir tous les événements
router.get('/', async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        student: true,
        author: {
          select: {
            id: true,
            username: true,
            role: true
          }
        }
      }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving events' });
  }
});

// Obtenir un événement par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        student: true,
        author: {
          select: {
            id: true,
            username: true,
            role: true
          }
        }
      }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving event' });
  }
});

// Créer un nouvel événement
router.post('/', async (req, res) => {
  try {
    const { studentId, type, points, comment, authorId } = req.body;
    const newEvent = await prisma.event.create({
      data: {
        studentId: parseInt(studentId),
        type,
        points: parseInt(points),
        comment,
        authorId: parseInt(authorId)
      }
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
});

// Mettre à jour un événement
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, points, comment } = req.body;
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        type,
        points: parseInt(points),
        comment
      }
    });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating event' });
  }
});

// Supprimer un événement
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' });
  }
});

export default router;
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtenir toutes les classes
router.get('/', async (_req, res) => {
  try {
    const classes = await prisma.class.findMany();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving classes' });
  }
});

// Obtenir une classe par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const classInfo = await prisma.class.findUnique({
      where: { id: parseInt(id) }
    });
    if (!classInfo) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving class' });
  }
});

// Créer une nouvelle classe
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newClass = await prisma.class.create({
      data: { name }
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: 'Error creating class' });
  }
});

// Mettre à jour une classe
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedClass = await prisma.class.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: 'Error updating class' });
  }
});

// Supprimer une classe
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.class.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting class' });
  }
});

export default router;
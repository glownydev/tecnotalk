import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Obtenir tous les étudiants
router.get('/', async (_req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { class: true }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving students' });
  }
});

// Obtenir un étudiant par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      include: { class: true }
    });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving student' });
  }
});

// Créer un nouvel étudiant
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, matricule, classId } = req.body;
    const newStudent = await prisma.student.create({
      data: {
        firstName,
        lastName,
        matricule,
        classId: parseInt(classId)
      }
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating student' });
  }
});

// Mettre à jour un étudiant
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, matricule, classId } = req.body;
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        matricule,
        classId: parseInt(classId)
      }
    });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating student' });
  }
});

// Supprimer un étudiant
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student' });
  }
});

export default router;
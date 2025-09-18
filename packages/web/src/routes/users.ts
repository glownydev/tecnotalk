import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { SignJWT } from 'jose';

const router = Router();
const prisma = new PrismaClient();

// Inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hasher le mot de passe
    const passwordHash = await hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
        role
      }
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Connexion d'un utilisateur
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Vérifier le mot de passe
    const validPassword = await compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Créer le token JWT
    const token = await new SignJWT({ 
      userId: user.id,
      role: user.role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret'));

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
});

// Obtenir tous les utilisateurs (admin seulement)
router.get('/', async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

export default router;
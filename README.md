# Tecnotalk

Application de gestion scolaire complète avec interface Electron et backend Next.js.

## Structure du projet

Le projet est organisé en monorepo avec deux packages principaux :

- `packages/desktop` : Application Electron (React + TypeScript)
- `packages/web` : Backend Next.js et panneau d'administration

## Prérequis

- Node.js 18+
- Yarn
- PostgreSQL

## Installation

1. Installer les dépendances :
```bash
yarn install
```

2. Configurer la base de données :
```bash
cd packages/web
npx prisma migrate dev
```

3. Lancer le développement :

Backend :
```bash
yarn web
```

Application desktop :
```bash
yarn desktop
```

## Variables d'environnement

Créer un fichier `.env` dans `packages/web` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/tecnotalk"
JWT_SECRET="votre-secret-jwt"
ALLOWED_ORIGIN="http://localhost:3000"
```

## Fonctionnalités

- Gestion des élèves et classes
- Système de points et croix
- Import/export CSV
- Mode expérimental (détection vocale)
- Interface administrateur sécurisée
- Mode sombre/clair
- Notifications système

## Licence

ISC
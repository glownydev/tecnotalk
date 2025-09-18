#!/bin/bash

# Installation des dépendances
npm install

# Génération des types Prisma
npx prisma generate

# Construction du projet
npm run build

# Démarrage du serveur
npm start
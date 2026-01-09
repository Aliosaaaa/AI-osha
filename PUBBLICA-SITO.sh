#!/bin/bash

# Script per pubblicare il sito AI OSHA su GitHub
# Esegui questo script per rendere visibili tutte le modifiche

echo "🚀 PUBBLICAZIONE SITO AI OSHA"
echo "================================"
echo ""

# Vai al branch main
echo "📝 Step 1: Passaggio a branch main..."
git checkout main
git pull origin main

# Merge dal branch di sviluppo
echo "📝 Step 2: Merge delle modifiche..."
git merge claude/add-logos-courses-notx7 --no-edit

# Mostra le modifiche
echo "📝 Step 3: Modifiche incluse:"
git log --oneline -5

echo ""
echo "✅ MERGE COMPLETATO!"
echo ""
echo "⚠️  IMPORTANTE:"
echo "Le modifiche sono pronte ma NON ancora su GitHub."
echo ""
echo "Per pubblicare su GitHub, hai 2 opzioni:"
echo ""
echo "OPZIONE 1 - Pull Request (Raccomandata):"
echo "Vai su: https://github.com/Aliosaaaa/AI-osha/compare/main...claude/add-logos-courses-notx7"
echo "Clicca 'Create Pull Request' e poi 'Merge Pull Request'"
echo ""
echo "OPZIONE 2 - Push da altro computer (se disponibile):"
echo "Clona il repository su un altro computer e fai git push origin main"
echo ""
echo "Dopo il merge/push, il sito sarà visibile su:"
echo "https://aliosaaaa.github.io/AI-osha/"
echo ""
echo "================================"

# Dependancies

npx create-react-app fredahoussi

## Install

```bash

# Désinstaller d'abord
npm uninstall tailwindcss postcss autoprefixer

# Réinstaller avec les dernières versions stables
npm install -D tailwindcss@3.4.0 postcss@8.4.31 autoprefixer@10.4.16

# Puis initialiser
npx tailwindcss init -p

```

## Error

```bash

# Arrête le serveur (Ctrl+C)
# Puis exécute ces commandes :
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start

```

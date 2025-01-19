# Usa l'immagine ufficiale Node.js
FROM node:20.18.0

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia i file fondamentali
COPY package.json yarn.lock ./

# Abilita corepack e imposta Yarn 4.5.0
RUN corepack enable && \
  corepack prepare yarn@4.5.0 --activate

# Imposta il nodeLinker in modo da usare la cartella node_modules
RUN yarn config set nodeLinker node-modules

# Installa le dipendenze
RUN yarn install

# Copia il resto dei sorgenti
COPY . .

# Espone la porta 5173 usata da Vite
EXPOSE 5173

# Avvia l'app in modalità sviluppo
CMD ["yarn", "dev", "--host", "0.0.0.0"]


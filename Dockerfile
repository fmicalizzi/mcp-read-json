FROM node:18-alpine

WORKDIR /app

# Copia archivos de package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm ci

# Copia código fuente
COPY . .

# Compila TypeScript
RUN npm run build

# Permisos para ejecutable
RUN chmod +x dist/index.js

# Puerto para posibles extensiones futuras con HTTP
EXPOSE 3000

# Ejecutar en modo STDIO
CMD ["node", "dist/index.js"]

# Usa la imagen oficial de Node.js 18 como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del backend
COPY . .

# Dockerfile para backend
COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Expone el puerto donde correrá la API
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "dev"]

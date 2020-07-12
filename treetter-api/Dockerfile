# Paso 1: Construyendo la aplicasion
FROM node:12.18 as node

RUN mkdir /server
WORKDIR /server
COPY --chown=node:node . .

RUN npm install
RUN npm run build

# Paso 2: Desplegando la api
FROM node:12.18-alpine

RUN mkdir /server
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY --from=node /server/dist .
CMD ["node", "/server/api/app"]
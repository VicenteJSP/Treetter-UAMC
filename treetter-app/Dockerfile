# Paso 1: Construyendo la aplicasion
FROM node:12.18 as node

RUN mkdir /app
WORKDIR /app
COPY --chown=node:node . .

RUN npm install
ARG config=production
RUN npm run build -- --prod --configuration=$config

#Paso 2: Creando servidor Nginx para despliege
FROM nginx:alpine

COPY --from=node /app/dist/treetter-client /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

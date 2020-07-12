# Treetter
Treetter es un sistema web, está diseñado para ser una herramienta de apoyo en el análisis de información de usuarios de Twitter. Esta aplicación es parte de mi proyecto terminal de licenciatura en Tecnologías y Sistemas de Información de la Universidad Autónoma Metropolitana unidad Cuajimalpa.

Requiere que tengas las credenciales que proporciona Twitter para el uso de su API.

Puedes probar el código de forma individual o si lo prefieres puedes hacerlo utilizando Docker, solo tienes que tener instalado docker y docker-compose.
```
docker-compose build
docker-compose up -d
```

Si optas por la opción individual, los datos de la API de Twitter deben ser agregados, en la carpeta treetter-api crea un nuevo archivo llamado .env con el siguiente formato:

```
CONSUMER_KEY_TWITTER=xxxxxxxxxxxxxxxxxxxxxxxxx
CONSUMER_SECRET_TWITTER=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ACCESS_TOKEN_TWITTER=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ACCESS_TOKEN_SECRET_TWITTER=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CALLBACK_URL=https://xxxxx.com/
```

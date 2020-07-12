# Treetter
Este proyecto implementa prácticas como el uso de pruebas unitarias haciendo uso de la librería [***Mocha***](https://mochajs.org/), [***Chai***](https://www.chaijs.com/) y [***Supertest***](https://github.com/visionmedia/supertest#readme), también implementó el uso de la librería [***Winston***](https://github.com/winstonjs/winston#readme) para generar un archivo de logs, se integrará también la librería [***Morgan***](https://github.com/expressjs/morgan#readme) para el registro de las llamadas REST.
> Se hará uso del ma metodología de desarrollo llama TDD (Test Driven Development)

## Servidor

<hr>

Se utilizará [***Express.js***](https://expressjs.com/es/) como framework para crear el servidor de la API que se encargará de generar la consulta de la información a **Twitter** por medio de la librería [***twitter-node-client***](https://www.npmjs.com/package/twitter-node-client), por ultimo se hace uso de [***Mongoose***](https://mongoosejs.com/) como libreria ODM para conectar con la base de datos, que en este caso se ha elegido [***MongoDB***](https://www.mongodb.com/es)

## Instalar y ejecutar la API Rest Treetter

<hr>

* Clona el respositorio `git clone https://github.com/VicenteJSP/treetter-backend.git`
* Entra en el directorio desde una terminal `cd X:/<DIR>/treetter-backend`
* Instala las dependencias con `npm install` o `npm i`
* Correr el servidor:
    * Modo desarrollo `npm run dev`
    * Modo producción `npm start`
    * Modo pruebas `npm test`
    * Modo reporte de covertura `npm run coverage`

## Ambiente de pruebas

<hr>

Para poder ejecutar las pruebas unitarias (son las únicas implementadas hasta el momento) se instalo y configuro dos de los frameworks más populares [***Mocha***](https://mochajs.org/) y [***Chai***](https://www.chaijs.com/), el proyecto esta planeado para ser desarrallado haciendo uso de la metodología de desarrollo __TDD__ (por sus siglas en inglés __Test Driven Development__ que se traduce como __Desarrollo Guiado por Pruebas__).


<hr>

[<img src="https://live.staticflickr.com/65535/49844839586_5575d72acd.jpg" height="70">]()
[<img src="https://live.staticflickr.com/65535/49845144242_85e005f883_m.jpg" height="70">](https://www.chaijs.com/)
[<img src="https://live.staticflickr.com/65535/49844295283_0948f5b256_m.jpg" height="70">](https://day.js.org/)
[<img src="https://live.staticflickr.com/65535/49844839561_3a766fc096_m.jpg" height="70">](https://expressjs.com/es/)
[<img src="https://live.staticflickr.com/65535/49844839536_eae4ee1c5c_m.jpg" height="70">]()
[<img src="https://live.staticflickr.com/65535/49844839521_7125ed5792_m.jpg" height="70">](https://mochajs.org/)
[<img src="https://live.staticflickr.com/65535/49845144177_58aa40ce94_m.jpg" height="70">](https://www.mongodb.com/es)
[<img src="https://live.staticflickr.com/65535/49845144167_54cd14a7a0_m.jpg" height="70">](https://nodejs.org/es/)
[<img src="https://live.staticflickr.com/65535/49844295228_39c5b335cf_m.jpg" height="70">](https://www.npmjs.com/)
[<img src="https://live.staticflickr.com/65535/49844295208_6523f4a2b1_m.jpg" height="70">](https://jwt.io/)
[<img src="https://live.staticflickr.com/65535/49844295198_4908d92d52_m.jpg" height="70">](https://twitter.com/)
[<img src="https://live.staticflickr.com/65535/49844295193_0aa2526887_m.jpg" height="70">](https://www.typescriptlang.org/)
[<img src="https://live.staticflickr.com/65535/49844295178_700afeae92_m.jpg" height="70">](https://code.visualstudio.com/)

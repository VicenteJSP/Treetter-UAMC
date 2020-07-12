import { config as dotenv } from 'dotenv';
dotenv();

import logger from '../service/logger.service';
import { PORT } from '../config/app.config';
import server from '../server/express.server';
// import { initDB } from '../db/mongo.db';


const init = async () => {
    try {
        // Inicio de Base de datos
        // await initDB();
        // Inicio de servidor Api
        if (!module.parent) {
            await server.listen(PORT);
            logger.registrySuccess(`La API se ha levantado correctamente el puerto ${PORT}`, 'SYSTEM');
        }
        return true;
    } catch (error) {
        logger.registryFail(`Error al ejecutar la API`, 'SYSTEM');
        return false;
    }
};

init();

export default server;
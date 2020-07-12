import { connect, connections, disconnect } from 'mongoose';
import logger from '../service/logger.service';
import { CONFIG_DB, getConnectionString, infoDB } from '../config/mongo.config';

const initDB = async () => {
    try {
        logger.registryGral(infoDB());
        return await connect(getConnectionString(), CONFIG_DB);
    } catch (error) {
        logger.registryError(infoDB());
        return logger.registryError(error, 'connec DB');
    }
};
const stopDB = async () => {
    try {
        logger.registryGral('Discconect DB');
        return await disconnect();
    } catch (error) {
        logger.registryError(infoDB());
        return logger.registryError(error, 'connec DB');
    }
};
const cleanDB = async () => { };

export { initDB, stopDB, cleanDB };
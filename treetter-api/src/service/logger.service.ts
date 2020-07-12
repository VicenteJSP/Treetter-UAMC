import logger from '../config/logger.config';


const registryGral = (message: string) => {
    logger.info(message);
};

const registrySuccess = (message: string, user?: string) => {
    user ? message = `(${user}) ${message}` : message;
    logger.info(`${message} (Success)`);
};

const registryFail = (message: string, user?: string) => {
    user ? message = `(${user}) ${message}` : message;
    logger.info(message);
};

const registryError = (message: string, user?: string) => {
    user ? message = `(${user}) ${message}` : message;
    logger.error(message);
};

export const stream = {
    write: (message: any) => {
        logger.info(message);
    },
};

export default { registryGral, registrySuccess, registryFail, registryError }
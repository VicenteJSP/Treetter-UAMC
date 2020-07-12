import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';
import 'dayjs/locale/es';
import dayjs from 'dayjs';

/**
 * Configuracion de Dayjs
 */
dayjs.locale('es');
const formatLogs = dayjs().format('YYYY/MM/DD HH:mm:ss');

/**
 * Formato de impresion para de logs
 */

const printLog = (action: TransformableInfo) => {
    const day = dayjs().format('dddd').toLocaleUpperCase();
    const dateLog = action.timestamp;
    const levelAction = action.level.toLocaleUpperCase();
    return `[ ${day} ${dateLog}] => ${levelAction}: ${action.message}`;
}

/**
 * Configuracion de Winston
 */
const printLogs = () => {
    const logConsole = new transports.Console();
    const logHistory = new transports.File({
        filename: 'logs/tasks/complete.log',
        maxsize: 5000000,
        maxFiles: 7
    });
    const logError = new transports.File({
        level: 'error',
        filename: 'logs/error/errors.log',
        maxsize: 1000000,
    });
    return process.env.NODE_ENV === 'testing' ? [logHistory, logError] : [logHistory, logError, logConsole];
};

const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp({ format: formatLogs }),
        format.printf(printLog)
    ),
    transports: printLogs(),
    exitOnError: false
});

export default logger;
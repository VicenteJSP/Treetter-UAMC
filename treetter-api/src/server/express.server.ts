import express, { Application, json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { CONFIG_MORGAN } from '../config/server.config';
import { stream } from '../service/logger.service';

const server: Application = express();

/**
 * Importar rutas de acceso
 */
import infoRoutes, { validateCredentials } from '../routes/info.routes';
import treemapRoutes from '../routes/treemap.routes';
import userRoutes from '../routes/user.routes';

/**
 * Configuracion de Middlewares
 */
server.use(json());
server.use(cors());
server.use(morgan(CONFIG_MORGAN, { stream }));

/**
 * Declaracion de Rutas
 */
server.use(infoRoutes);
// server.use('/api', validateCredentials);
server.use('/api/user', userRoutes);
server.use('/api/treemap', treemapRoutes);

export default server;
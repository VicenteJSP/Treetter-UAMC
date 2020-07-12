/**
 * Puerto de exposicion de servicio
 */
export const PORT = process.env.PORT || 3001;

/**
 * Secret para firmar token
 */
export const SECRET_TOKEN = process.env.SECRET_TOKEN || 'S3cR37?70k3N#7r3Et&3e9';

/**
 * Tiempo de expiracion del token de acceso
 */
export const expiresIn = process.env.EXP_TOKEN || '1m';
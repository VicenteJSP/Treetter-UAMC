import { compare } from 'bcryptjs';
import { sign, verify, decode } from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { SECRET_TOKEN, expiresIn } from '../config/app.config';
import logger from './logger.service';

const createToken = async (user: IUser): Promise<string | boolean> => {
    const { username, role } = user;
    try {
        const token = sign({ username, role }, SECRET_TOKEN, { expiresIn });
        logger.registrySuccess('Creando token', username);
        return token;
    } catch (error) {
        logger.registryError('Fallo al crear token', username);
        return false;
    }
};

const userAuth = async (user: IUser, password: string): Promise<boolean> => {
    return compare(password, user.password);
}

const extractToken = (bearerToken: string): string => {
    if (!bearerToken.includes('bearer ')) return 'Token invalido';
    return bearerToken.replace('bearer ', '');
};

const validateToken = async (accessToken: string, role: string): Promise<boolean | { username: string, validated: boolean }> => {
    try {
        const token = extractToken(accessToken);
        if (token === 'Token invalido') return false;
        const data: any = decode(token);
        if (data != null && !data.role.includes(role)) return false;
        const credentials: any = verify(token, SECRET_TOKEN);
        return { username: credentials ? credentials.username : null, validated: credentials !== null };
    } catch (error) {
        logger.registryFail(`${error.message}\n${accessToken}\n`);
        return { username: null, validated: false }
    }
};

export { createToken, validateToken, userAuth };

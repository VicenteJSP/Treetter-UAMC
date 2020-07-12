import { UserModel, UserReq, IUser } from '../models/user.model';
import { hash } from 'bcryptjs';
import logger from './logger.service';

const createUser = async (user: UserReq) => {
    try {
        user.password = await hash(user.password, 10);
        const newUser = new UserModel(user);
        const userSave = await newUser.save();
        logger.registrySuccess(`Usuario creado correctamente ${userSave.username}`, 'SYSTEM_CREATE_USER');
        return userSave;
    } catch (error) {
        if ('_message' in error) {
            const data = error.message.replace('User validation failed: ', '').split(',')
                .map((e: any) => {
                    const dataTxt = e.split(':');
                    return JSON.parse(`{"${dataTxt[0].trim()}":"${dataTxt[1].trim()}"}`);
                });
            logger.registryError(error, 'SYSTEM_DUPLICATE_DATA');
            return { code: 403, data };
        }
        logger.registryError(error, 'SYSTEM_CREATE_USER');
        return { code: 500 };
    }
};

const updateUser = async (username: string, updateData: UserReq) => {
    try {
        const result = await UserModel.updateOne({ username }, updateData);
        logger.registrySuccess(`Usuario creado correctamente ${username}`, 'SYSTEM_UPDATE_USER');
        return result;
    } catch (error) {
        logger.registryError(error, 'SYSTEM_UPDATE_USER');
        return { code: 500 };
    }
};

const consultUser = async (login:{username?: string, email?: string}): Promise<IUser | { code: number, data: Array<any> }> => {
    try {
        const search = login.email ? { email: login.email } : { username: login.username };
        const user = await UserModel.findOne(search);
        logger.registrySuccess(`Consulta al usuario ${search}`, 'SYSTEM_CONSULT_USER');
        return user;
    } catch (error) {
        logger.registryError(error, 'SYSTEM_CONSULT_USER');
        return { code: 500, data: [] };
    }
};

const deleteUser = async (email: string) => {
    try {
        const user = await UserModel.findOne({ email });
        user.active = false;
        const userUpdate = await user.save();
        logger.registrySuccess(`Consulta al usuario ${email}`, 'SYSTEM_DELETE_USER');
        return userUpdate;
    } catch (error) {
        logger.registryError(error, 'SYSTEM_DELETE_USER');
        return { code: 500 };
    }
};

export { createUser, updateUser, consultUser, deleteUser }
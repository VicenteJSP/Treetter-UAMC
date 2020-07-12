import { Request, Response, NextFunction } from 'express';
import { IResMsgConfig } from '../models/interfaces.model';
import { MessageResponse } from '../models/messages.model';
import { UserReq } from '../models/user.model';
import { createMsg } from '../service/answer.service';
import { createUser, consultUser } from '../service/user.service';
import { createToken, userAuth, validateToken } from '../service/auht.service';
import logger from '../service/logger.service';

const register = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    let config: IResMsgConfig;
    let response: MessageResponse;
    if (!username || !password || !email) {
        let required: Array<string> = [];
        config = { type_action: 'create_account', message_route: 'user', code: 401, success: false };
        if (!username) required.push('username');
        if (!password) required.push('password');
        if (!email) required.push('email');
        response = createMsg(config, { required });
        return res.status(config.code).json(response);
    }
    const user: UserReq = { username, password, email };
    try {
        const userRegistered = await createUser(user);
        if ('code' in userRegistered) {
            config = { type_action: 'create_account', message_route: 'user', code: userRegistered.code, success: false };
            let data = {};
            if ('data' in userRegistered) data = userRegistered.data;
            response = createMsg(config, data);
            return res.status(config.code).json(response);
        }
        const access_token = await createToken(userRegistered);
        if (!access_token) {
            config = { type_action: 'user_auth', message_route: 'auth', code: 500, success: false };
            response = createMsg(config, {});
            return res.status(config.code).json(response);
        }
        config = { type_action: 'create_account', message_route: 'user', code: 201, success: true };
        response = createMsg(config, { access_token, username, role: userRegistered.role, method: 'bearer' });
        return res.status(config.code).json(response);
    } catch (error) {
        logger.registryError(error, 'CREATE_ACCOUNT')
        config = { type_action: 'create_account', message_route: 'user', code: 500, success: false };
        response = createMsg(config, {});
        return res.status(config.code).json(response);
    }
};

const login = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    let config: IResMsgConfig;
    let response: MessageResponse;
    if (!password || !email) {
        let required: Array<string> = [];
        config = { type_action: 'user_auth', message_route: 'auth', code: 403, success: false };
        if (!password) required.push('password');
        if (!email) required.push('email');
        response = createMsg(config, { required });
        return res.status(config.code).json(response);
    }
    try {
        const user = await consultUser({ email });
        if (!user) {
            config = { type_action: 'user_auth', message_route: 'auth', code: 400, success: false };
            response = createMsg(config, {});
            return res.status(config.code).json(response);
        }
        if ('code' in user) {
            config = { type_action: 'user_auth', message_route: 'auth', code: user.code, success: false };
            let data = {};
            if ('data' in user) data = user.data;
            response = createMsg(config, data);
            return res.status(config.code).json(response);
        }
        if (!(await userAuth(user, password))) {
            config = { type_action: 'user_auth', message_route: 'auth', code: 401, success: false };
            response = createMsg(config, {});
            return res.status(config.code).json(response);
        }
        const access_token = await createToken(user);
        config = { type_action: 'user_auth', message_route: 'auth', code: 201, success: true };
        response = createMsg(config, { access_token, username: user.username, role: user.role, method: 'bearer' });
        return res.status(config.code).json(response);
    } catch (error) {
        logger.registryError(error, 'LOGIN_USER')
        config = { type_action: 'user_auth', message_route: 'auth', code: 500, success: false };
        response = createMsg(config, {});
        return res.status(config.code).json(response);
    }
};

const validateCredentials = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const { role } = req.query;
    let config: IResMsgConfig = null;
    let response: MessageResponse = null;

    if (!authorization || !role) {
        config = { type_action: 'user_info', message_route: 'user', code: 401, success: false };
        response = createMsg(config, {});
    } else {
        const credentials: any = await validateToken(authorization, `${role}`);
        if (!credentials.validated) {
            config = { type_action: 'user_info', message_route: 'user', code: 401, success: false };
            response = createMsg(config, {});
        }
        req.body.username = credentials.username;
    };
    return response ? res.status(config.code).json(response) : next();
};

export { register, login, validateCredentials }
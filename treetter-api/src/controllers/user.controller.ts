import { Request, Response } from 'express';
import { createMsg } from '../service/answer.service'
import { IResMsgConfig } from '../models/interfaces.model';
import { consultUser } from '../service/user.service'
import { IUser } from '../models/user.model';

const getUserInfo = async (req: Request, res: Response) => {
    const { username } = req.body;
    const user: IUser | { code: number, data: Array<any> } = await consultUser({ username });
    if ('code' in user) {
        let config: IResMsgConfig = { type_action: 'user_info', message_route: 'user', code: user.code, success: false };
        let response = createMsg(config, {});
        return res.status(config.code).json(response);
    }
    const { active, avatar, username: name, email, createdAt, updatedAt } = user;
    let config: IResMsgConfig = { type_action: 'user_info', message_route: 'user', code: 200, success: true };
    let response = createMsg(config, { active, avatar, username: name, email, createdAt, updatedAt });
    return res.status(config.code).json(response);
};

export { getUserInfo };
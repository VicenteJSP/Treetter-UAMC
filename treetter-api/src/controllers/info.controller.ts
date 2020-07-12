import { Request, Response } from 'express';
import { createMsg } from '../service/answer.service'
import { IResMsgConfig } from '../models/interfaces.model';
import list from '../config/info.config';


const getInfo = (req: Request, res: Response) => {
    const config: IResMsgConfig = { type_action: 'query_info', message_route: 'info', code: 200, success: true };
    const response = createMsg(config, { list });
    return res.status(config.code).json(response);
};

export default getInfo;
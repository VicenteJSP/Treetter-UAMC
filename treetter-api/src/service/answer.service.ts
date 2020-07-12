import messageTxt from '../config/messages.config';
import { IResMsgConfig } from '../models/interfaces.model';
import { MessageResponse } from '../models/messages.model'

const createMsg = (config: IResMsgConfig, data: any) => {

    const { code, success, type_action, message_route: route } = config;
    const message = messageTxt[route][type_action][success ? 'success' : 'fail'][code];

    return new MessageResponse(config, message, data);

};

export { createMsg }
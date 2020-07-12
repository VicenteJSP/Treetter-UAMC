import { IResMsgConfig } from "./interfaces.model";

class MessageResponse {
    code: number;
    data: object;
    message: string;
    success: boolean;
    type_action: string;

    constructor(config: IResMsgConfig, message: string, data: object) {

        this.data = data;
        this.message = message;
        this.code = config.code; 
        this.success = config.success;
        this.type_action = config.type_action;
    }
}

export { MessageResponse }
import { ConnectionOptions } from 'mongoose';

const HOST_DB = process.env.HOST_DB || '127.0.0.1';
const PORT_DB = process.env.PORT_DB || 27017;
const NAME_DB = process.env.NAME_DB || 'treetter-test';
const SRV_DB = process.env.SRV_DB || false;
const USER_DB = process.env.USER_DB || '';
const PASSWD_DB = process.env.PASSWD_DB || '';

export const CONFIG_DB: ConnectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true };

export const getConnectionString = () => {
    let response = `mongodb${SRV_DB ? '+srv' : ''}://`;
    response = USER_DB ? `${response}${USER_DB}:${PASSWD_DB}@` : response;
    response = `${response}${HOST_DB}${PORT_DB ? `:${PORT_DB}` : ''}/${NAME_DB}`;
    return response;
};

export const infoDB = () => `Connect_DB: ${NAME_DB}, auth: ${ USER_DB ? true: false }`;
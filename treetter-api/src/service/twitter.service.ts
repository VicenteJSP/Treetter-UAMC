import { ITweet } from '../models/apiTwitter.model';
import { Twitter } from 'twitter-node-client';
import { config } from '../config/twitter.config';
import logger from './logger.service';

const twitter = new Twitter(config);

const searchHistoryUser = async (username: string): Promise<Array<ITweet>> => {
    return new Promise(
        (resolve, reject) => {
            twitter.getUserTimeline({ screen_name: username, count: 200 },
                (err: { statusCode: number, data: Array<any> }, res: any, body: any) => {
                    logger.registryError(`Usuario no encontrado (${JSON.stringify(err.statusCode)})`);
                    reject({ code: err.statusCode })
                },
                (data: any) => {
                    logger.registrySuccess('Quuery for Twitter', username);
                    resolve(JSON.parse(data));
                }
            );
        }
    );
}

export { searchHistoryUser }
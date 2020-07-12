import { Request, Response } from 'express';
import { createMsg } from '../service/answer.service'
import { IResMsgConfig } from '../models/interfaces.model';
import logger from '../service/logger.service';
import { MessageResponse } from '../models/messages.model';
import { searchHistoryUser } from '../service/twitter.service'
import { ITweet } from '../models/apiTwitter.model';
import { processTweets } from '../service/treetter.service';
import { Treetter } from '../models/treemap.model';

const getTreemap = async (req: Request, res: Response) => {
    const { user } = req.params;
    let config: IResMsgConfig;
    let response: MessageResponse;
    if (!user) {
        config = { type_action: 'query_treemap', message_route: 'treemap', code: 401, success: false }
        response = createMsg(config, { treemap: [] });
        logger.registryFail(`Error: Not exists a user for query`, `SYSTEM_QUERY_TREMAP_${user}`);
        return res.status(config.code).json(response);
    }
    try {
        config = { type_action: 'query_treemap', message_route: 'treemap', code: 200, success: true }
        const tweets: Array<ITweet> = await searchHistoryUser(user);
        const { countTweets, platforms } = await processTweets(tweets);
        const treetter = new Treetter({ user, sample: tweets.length, countTweets, platforms });
        response = createMsg(config, treetter);
        return res.status(config.code).json(response);
    } catch (error) {
        logger.registryError(error, `SYSTEM_QUERY_TREMAP_${user}`);
        config = {
            type_action: 'query_treemap',
            message_route: 'treemap',
            code: error.code ? error.code === 404 ? 404 : 500 : 500,
            success: false
        }
        response = createMsg(config, []);
        return res.status(config.code).json(response);
    }
};

export { getTreemap };
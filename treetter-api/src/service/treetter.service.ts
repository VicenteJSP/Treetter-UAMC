import { ITweet, IEntities } from "../models/apiTwitter.model";
import { ICountTweets, IUserInfo, INumberTweets, ITweetProcess } from "../models/treemap.model";
import { TTweet, TCategoryTweet } from '../models/types.model';


const processTweets = async (tweets: Array<ITweet>): Promise<ITweetProcess> => {
    let countTweets: ICountTweets = {
        tweets: {
            rt: { both: 0, hashtag: 0, mention: 0, text: 0 },
            to: { both: 0, hashtag: 0, mention: 0, text: 0 },
            tr: { both: 0, hashtag: 0, mention: 0, text: 0 }
        },
        user: {
            createdAtUser: new Date(),
            picProfile: '',
            both: 0,
            favorited: 0,
            followers: 0,
            friends: 0,
            retweeted: 0,
            verified: false
        }
    };
    let platforms: Array<string> = [];
    for (const tweet of tweets) {
        const { text, in_reply_to_status_id: inReply } = tweet;
        const platform = tweet.source.replace(/<[^>]*>/g, '');
        platforms = platformAddArray(platforms, platform);
        if (text.includes('RT @')) {
            countTweets = updateCount(tweet, countTweets, 'ReTweet');
        }
        else {
            inReply ?
                countTweets = updateCount(tweet, countTweets, 'ResponseTweet') :
                countTweets = updateCount(tweet, countTweets, 'TweetOriginal');
        }
    }
    return { countTweets, platforms }
};

const platformAddArray = (platforms: Array<string>, platform: string): Array<string> => {
    if (!platforms.includes(platform)) platforms.push(platform);
    return platforms;
};

const updateCount = (tweet: ITweet, countTweets: ICountTweets, typeTweet: TTweet): ICountTweets => {
    const tweets: INumberTweets = categorizeTweet(tweet.entities, countTweets.tweets, typeTweet);
    const { user } = countTweets;
    return { tweets, user: typeTweet !== 'ReTweet' ? categorizeInteraction(tweet, countTweets.user) : user };
};

const categorizeInteraction = (tweet: ITweet, infoUser: IUserInfo): IUserInfo => {
    const { retweet_count, favorite_count  } = tweet;
    infoUser.createdAtUser = new Date(tweet.user.created_at);
    infoUser.picProfile = tweet.user.profile_image_url.replace(`_normal`, '');
    infoUser.verified = tweet.user.verified;
    infoUser.followers = tweet.user.followers_count;
    infoUser.friends = tweet.user.friends_count;
    if (retweet_count > 0 && favorite_count > 0) infoUser.both = infoUser.both + 1;
    else if (retweet_count > 0) infoUser.retweeted = infoUser.retweeted + 1;
    else if (favorite_count > 0) infoUser.favorited = infoUser.favorited + 1;
    return infoUser;
}

const categorizeTweet = (entities: IEntities, countTweets: INumberTweets, typeTweet: TTweet): INumberTweets => {
    const { hashtags, user_mentions: mention } = entities;
    if (hashtags.length > 0 && mention.length > 0) return incrementNTweets(countTweets, typeTweet, 'both');
    if (hashtags.length) return incrementNTweets(countTweets, typeTweet, 'hashtag');
    if (mention.length > 0) return incrementNTweets(countTweets, typeTweet, 'mention');
    return incrementNTweets(countTweets, typeTweet, 'text');
};

const incrementNTweets = (countTweets: INumberTweets, typeTweet: TTweet, category: TCategoryTweet): INumberTweets => {
    switch (typeTweet) {
        case 'ReTweet':
            countTweets.rt[category] += 1;
            break;
        case 'TweetOriginal':
            countTweets.to[category] += 1;
            break;
        case 'ResponseTweet':
            countTweets.tr[category] += 1;
            break;
        default:
            break;
    }
    return countTweets
};

export { processTweets };
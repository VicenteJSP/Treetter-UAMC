interface ITweetType {
    hashtag?: number;
    mention?: number;
    both?: number;
    text?: number;
}

interface INumberTweets {
    rt?: ITweetType;
    to?: ITweetType;
    tr?: ITweetType;
}

interface Community {
    followers?: number;
    friends?: number;
}

interface IInteraction {
    retweeted?: number;
    favorited?: number;
    both?: number;
}

interface IValuesTreemap {
    community: Community;
    interaction: IInteraction;
    tweets: INumberTweets;
}

interface IUserInfo extends Community, IInteraction {
    verified: boolean;
    picProfile: string;
    createdAtUser: Date;
}

interface ICountTweets {
    user?: IUserInfo;
    tweets?: INumberTweets;
}

interface ISheet {
    color: string
    value: number;
    size: number;
    description: string;
}

class TreemapNode {
    name: string
    children?: Array<TreemapNode>
    color?: string
    value?: number;
    size?: number;
    description?: string
    constructor(node: { name: string, children?: Array<TreemapNode>, data?: ISheet }) {
        this.name = node.name ? node.name : null;
        if (node.children) this.children = node.children;
        if (node.data) {
            this.color = node.data.color ? node.data.color : null;
            this.value = node.data.value ? node.data.value : null;
            this.size = node.data.size ? node.data.size : null;
            this.description = node.data.description ? node.data.description : null;
        };
    }
}

class Treemap {
    name: string;
    picProfile: string;
    verified: boolean;
    children: Array<TreemapNode>;
    constructor(treemapCofig: ITreemap) {

        const { picProfile, verified } = treemapCofig.countTweets.user;
        const { followers, friends } = treemapCofig.countTweets.user;
        const { retweeted, favorited, both } = treemapCofig.countTweets.user;
        const { tr: tweetReplay, to: tweetOriginal, rt: tweetRT } = treemapCofig.countTweets.tweets;

        this.name = treemapCofig.name ? treemapCofig.name : null;
        this.picProfile = picProfile ? picProfile : null;
        this.verified = verified ? verified : null;

        /**
         * Declaracion y configuracion de los nodos del arbol
         */

        const value = this.calculateValue(treemapCofig.countTweets);

        let followersAccount: ISheet = {
            color: '#230A59',
            value: value.community.followers,
            description: 'Seguidores (Cuentas que sigen esta cuenta)',
            size: followers
        };
        let friendsAccount: ISheet = {
            color: '#0029FA',
            value: value.community.friends,
            description: 'Amigos (Cuentas a las que sigue)',
            size: friends
        };

        let reTweeds: ISheet = {
            color: '#8217CC',
            value: value.interaction.retweeted,
            description: 'Tweets de la cuenta que han citados por otras cuentas',
            size: retweeted
        };
        let favoriteTweet: ISheet = {
            color: '#C169FF',
            value: value.interaction.favorited,
            description: 'Tweets de la cuenta que le han gustado a otras cuentas',
            size: favorited
        };
        let bothInteraction: ISheet = {
            color: '#510E80',
            value: value.interaction.both,
            description: 'Tweets con cita y like de otras cuentas',
            size: both
        };

        let hashtagRT: ISheet = {
            color: '#BF9169',
            value: value.tweets.rt.hashtag,
            description: 'Tweets con hashtag (#)',
            size: tweetRT.hashtag
        };
        let mentionRT: ISheet = {
            color: '#D9B68B',
            value: value.tweets.rt.mention,
            description: 'Tweets con mencion a otros usuarios (@)',
            size: tweetRT.mention
        };
        let bothRT: ISheet = {
            color: '#8C634A',
            value: value.tweets.rt.both,
            description: 'Tweets con hashtag y mencion a otros usuarios (#+@)',
            size: tweetRT.both
        };
        let textRT: ISheet = {
            color: '#F2DAC4',
            value: value.tweets.rt.text,
            description: 'Tweets que solo contienen texto simple',
            size: tweetRT.text
        };

        let hashtagOriginal: ISheet = {
            color: '#5DA649',
            value: value.tweets.to.hashtag,
            description: 'Tweets con hashtag (#)',
            size: tweetOriginal.hashtag
        };
        let mencionOriginal: ISheet = {
            color: '#6CBF45',
            value: value.tweets.to.mention,
            description: 'Tweets con mencion a otros usuarios (@)',
            size: tweetOriginal.mention
        };
        let bothOriginal: ISheet = {
            color: '#2F5928',
            value: value.tweets.to.both,
            description: 'Tweets con hashtag y mencion a otros usuarios (#+@)',
            size: tweetOriginal.both
        };
        let textOriginal: ISheet = {
            color: '#C9F2B6',
            value: value.tweets.to.text,
            description: 'Tweets que solo contienen texto simple',
            size: tweetOriginal.text
        };

        let hashtagReply: ISheet = {
            color: '#05C7F2',
            value: value.tweets.tr.hashtag,
            description: 'Tweets con hashtag (#)',
            size: tweetReplay.hashtag
        };
        let mencionReply: ISheet = {
            color: '#049DD9',
            value: value.tweets.tr.mention,
            description: 'Tweets con mencion a otros usuarios (@)',
            size: tweetReplay.mention
        };
        let bothReply: ISheet = {
            color: '#224459',
            value: value.tweets.tr.both,
            description: 'Tweets con hashtag y mencion a otros usuarios (#+@)',
            size: tweetReplay.both
        };
        let textReply: ISheet = {
            color: '#B3ECF2',
            value: value.tweets.tr.text,
            description: 'Tweets que solo contienen texto simple',
            size: tweetReplay.text
        };

        const followersAccountNode: TreemapNode = new TreemapNode({ name: 'Seguidores', data: followersAccount });
        const friendsAccountNode: TreemapNode = new TreemapNode({ name: 'Amigos', data: friendsAccount });

        const reTweetedNode: TreemapNode = new TreemapNode({ name: 'Citas', data: reTweeds });
        const favoritedNode: TreemapNode = new TreemapNode({ name: 'Favoritos', data: favoriteTweet });
        const bothInteractionNode: TreemapNode = new TreemapNode({ name: 'RT+Like', data: bothInteraction });

        const hashtagRTNode: TreemapNode = new TreemapNode({ name: 'hashtag', data: hashtagRT });
        const mencionRTNode: TreemapNode = new TreemapNode({ name: 'mencion', data: mentionRT });
        const bothRTNode: TreemapNode = new TreemapNode({ name: 'ambos', data: bothRT });
        const textRTNode: TreemapNode = new TreemapNode({ name: 'texto', data: textRT });

        const hashtagOriginalNode: TreemapNode = new TreemapNode({ name: 'hashtag', data: hashtagOriginal });
        const mencionOriginalNode: TreemapNode = new TreemapNode({ name: 'mencion', data: mencionOriginal });
        const bothOriginalNode: TreemapNode = new TreemapNode({ name: 'ambos', data: bothOriginal });
        const textOriginalNode: TreemapNode = new TreemapNode({ name: 'texto', data: textOriginal });

        const hashtagReplyNode: TreemapNode = new TreemapNode({ name: 'hashtag', data: hashtagReply });
        const mencionReplyNode: TreemapNode = new TreemapNode({ name: 'mencion', data: mencionReply });
        const bothReplyNode: TreemapNode = new TreemapNode({ name: 'ambos', data: bothReply });
        const textReplyNode: TreemapNode = new TreemapNode({ name: 'texto', data: textReply });

        const childrenOriginalTweet = [hashtagOriginalNode, mencionOriginalNode, bothOriginalNode, textOriginalNode]
            .filter((e => e.size && e.size > 0));
        const childrenReplyTweet = [hashtagReplyNode, mencionReplyNode, bothReplyNode, textReplyNode]
            .filter((e => e.size && e.size > 0));

        const childrenReTweet = [hashtagRTNode, mencionRTNode, bothRTNode, textRTNode]
            .filter((e => e.size && e.size > 0));

        const originalTweetNode: TreemapNode = new TreemapNode({ name: 'Tweets Originales', children: childrenOriginalTweet });
        const replyTweetNode: TreemapNode = new TreemapNode({ name: 'Tweet de Respuesta', children: childrenReplyTweet });

        const accountNode: TreemapNode = new TreemapNode({ name: 'Comunidad', children: [followersAccountNode, friendsAccountNode] });
        const interactionNode: TreemapNode = new TreemapNode({ name: 'Interaccion', children: [reTweetedNode, favoritedNode, bothInteractionNode] });
        const reTweetNode: TreemapNode = new TreemapNode({ name: 'ReTweet', children: childrenReTweet });
        const originalNode: TreemapNode = new TreemapNode({ name: 'Propios', children: [originalTweetNode, replyTweetNode] });

        const personalNode: TreemapNode = new TreemapNode({ name: 'Personal', children: [accountNode, interactionNode] });
        const tweetsNode: TreemapNode = new TreemapNode({ name: 'Tweets', children: [reTweetNode, originalNode] });

        this.children = [personalNode, tweetsNode];
    }

    private calculateValue(countTweets: ICountTweets): IValuesTreemap {
        const { tweets, user } = countTweets;
        const addCount: Function = (count: ITweetType) => {
            let res = 0;
            for (let property in count) res += count[property];
            return res;
        }
        const totalCommunity: number = user.friends + user.followers;
        const totalInteractionnumber = user.both + user.favorited + user.retweeted;
        const totalTweets: number = [addCount(tweets.rt), addCount(tweets.to), addCount(tweets.tr)]
            .reduce((count, value) => count + value);
        const communityPercent: Community =
        {
            friends: (user.friends * 150) / totalCommunity,
            followers: (user.followers * 150) / totalCommunity
        }
        const interactionPercent: IInteraction =
        {
            favorited: (user.favorited * 150) / totalInteractionnumber,
            retweeted: (user.retweeted * 150) / totalInteractionnumber,
            both: (user.both * 150) / totalInteractionnumber
        };
        const tweetsPercent: INumberTweets = {
            rt: {
                hashtag: (tweets.rt.hashtag * 700) / totalTweets,
                mention: (tweets.rt.mention * 700) / totalTweets,
                both: (tweets.rt.both * 700) / totalTweets,
                text: (tweets.rt.text * 700) / totalTweets
            },
            to: {
                hashtag: (tweets.to.hashtag * 700) / totalTweets,
                mention: (tweets.to.mention * 700) / totalTweets,
                both: (tweets.to.both * 700) / totalTweets,
                text: (tweets.to.text * 700) / totalTweets
            },
            tr: {
                hashtag: (tweets.tr.hashtag * 700) / totalTweets,
                mention: (tweets.tr.mention * 700) / totalTweets,
                both: (tweets.tr.both * 700) / totalTweets,
                text: (tweets.tr.text * 700) / totalTweets
            }
        }

        return { community: communityPercent, interaction: interactionPercent, tweets: tweetsPercent };
    }

}

interface ITreemap {
    name: string;
    countTweets: ICountTweets;
}

interface ITweetProcess {
    countTweets: ICountTweets;
    platforms: string[]
}

interface ITreetterConfig {
    user: string;
    sample: number;
    countTweets: ICountTweets;
    platforms: string[];
}

class Treetter {
    user: string;
    sample: number;
    treemap: Treemap;
    platforms: string[];
    constructor(dataTreetter: ITreetterConfig) {
        const { user, sample, countTweets, platforms } = dataTreetter;
        this.user = user ? user : null;
        this.sample = sample ? sample : null;
        this.platforms = platforms ? platforms : null;
        this.treemap = new Treemap({ name: user, countTweets });
    }
}

export { Treetter, ICountTweets, IUserInfo, INumberTweets, ITweetProcess }
type TAction = 'query_info' | 'query_treemap' | 'create_account' | 'update_account' | 'delete_account' | 'user_auth' | 'user_info';
type TMsgRoute = 'info' | 'user' | 'treemap' | 'auth';
type TROLE_USER = 'ROLE_ADMIN' | 'ROLE_RESEARCHER';
type TTweet = 'ReTweet' | 'TweetOriginal' | 'ResponseTweet';
type TCategoryTweet = 'hashtag' | 'mention' | 'text' | 'both';

export { TAction, TMsgRoute, TROLE_USER, TTweet, TCategoryTweet };
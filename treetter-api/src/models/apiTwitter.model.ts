interface IMediaSize {
    thumb?: { w: number, h: number, resize: string };
    small?: { w: number, h: number, resize: string };
    large?: { w: number, h: number, resize: string };
    medium?: { w: number, h: number, resize: string };
}

interface IEntitieHashtags {
    text?: string;
    indices?: Array<number>;
}

interface IEntitieSymbols {
    text?: string;
    indices?: Array<number>;
}

interface IEntitieUserMentions {
    screen_name?: string;
    name?: string;
    id?: number;
    id_str?: string;
    indices?: Array<number>;
}

interface IEntitieUrls {
    display_url?:string;
    expanded_url?:string;
    indices?: Array<number>;
    url?:string;
}

interface IEntitieMedia {
    id?: number;
    id_str?: string;
    indices?: Array<number>;
    media_url?: string;
    media_url_https?: string;
    url?: string;
    display_url?: string;
    expanded_url?: string;
    type?: string;
    sizes?: IMediaSize;
    video_info?: string;
}

interface IEntities {
    hashtags?: Array<IEntitieHashtags>;
    symbols?: Array<IEntitieSymbols>;
    user_mentions?: Array<IEntitieUserMentions>;
    urls?: Array<IEntitieUrls>;
    media?: Array<IEntitieMedia>;
}

interface IUser {
    id?: number;
    id_str?: string;
    name?: string;
    screen_name?: string;
    location?: string;
    url?: string;
    description?: string;
    translator_type?: string;
    protected?: boolean;
    verified?: boolean;
    followers_count?: number;
    friends_count?: number;
    listed_count?: number;
    favourites_count?: number;
    statuses_count?: number;
    created_at?: string;
    utc_offset?: number;
    time_zone?: string;
    geo_enabled?: boolean;
    lang?: string;
    contributors_enabled?: boolean;
    is_translator?: boolean;
    profile_background_color?: string;
    profile_background_image_url?: string;
    profile_background_image_url_https?: string;
    profile_background_tile?: boolean;
    profile_link_color?: string;
    profile_sidebar_border_color?: string;
    profile_sidebar_fill_color?: string;
    profile_text_color?: string;
    profile_use_background_image?: boolean;
    profile_image_url?: string;
    profile_image_url_https?: string;
    profile_banner_url?: string;
    default_profile?: boolean;
    default_profile_image?: boolean;
    following?: boolean;
    follow_request_sent?: boolean;
    notifications?: boolean;
    entities?: IEntities;
    is_translation_enabled?: boolean;
    has_extended_profile?: boolean;
}

interface ITweet {
    created_at: string;
    id?: number;
    id_str?: string;
    text?: string;
    source?: string;
    truncated?: boolean;
    in_reply_to_status_id?: number;
    in_reply_to_status_id_str?: string;
    in_reply_to_user_id?: number;
    in_reply_to_user_id_str?: string;
    in_reply_to_screen_name?: string;
    user?: IUser;
    geo?: string;
    coordinates?: string;
    place?: string;
    contributors?: string;
    retweeted_status?: string;
    is_quote_status?: string;
    retweet_count?: number;
    favorite_count?: number;
    entities?: IEntities;
    favorited?: boolean;
    retweeted?: boolean;
    lang?: string;
    quote_count?: number;
    reply_count?: number;
    filter_level?: string;
    matching_rules?: string;
    possibly_sensitive?: string;
    extended_entities?: IEntities;
}

export { ITweet, IUser as IUserTwitter, IEntities }
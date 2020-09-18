export const POSTS_URI = '//instagram.com/anime._.faction/?__a=1';
export const morePosts_URI = (query_hash: string, end_cursor: string) =>
    `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables=%7B%22id%22%3A%2234690256339%22%2C%22first%22%3A12%2C%22after%22%3A%22${end_cursor}%22%7D`;

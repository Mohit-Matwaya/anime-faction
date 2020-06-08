async function fetchPosts(callBack, options = {}) {
  const jsonBody = await fetch(`//instagram.com/anime._.faction/?__a=1`);
  const res = await jsonBody.json();
  callBack(res.graphql.user.edge_owner_to_timeline_media);
}

async function fetchMorePosts(callBack, end_cursor) {
  const query_hash = '7c8a1055f69ff97dc201e752cf6f0093';
  const jsonBody = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables=%7B%22id%22%3A%2234690256339%22%2C%22first%22%3A36%2C%22after%22%3A%22${end_cursor}%22%7D`
    );
    const res = await jsonBody.json();

  callBack(res.data.user.edge_owner_to_timeline_media);
}

export { fetchPosts, fetchMorePosts };

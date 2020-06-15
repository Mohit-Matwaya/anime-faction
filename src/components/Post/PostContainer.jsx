import React, { useState, useEffect } from 'react';
import Post from './Post';
import { fetchMorePosts } from '../../fetchPosts';

function PostContainer(props) {
  const [data, setData] = useState({ edges: [] });

  useEffect(() => {
    (async () => {
      const _json = await fetch('//instagram.com/anime._.faction/?__a=1');
      const res = await _json.json();
      setData(res['graphql']['user']['edge_owner_to_timeline_media']);
    })();
  }, []);

  async function loadMore() {
    const res = await fetchMorePosts(data.page_info.end_cursor);
    const newData = {
      count: res.data.user.edge_owner_to_timeline_media.count,
      edges: [
        ...data.edges,
        ...res.data.user.edge_owner_to_timeline_media.edges,
      ],
      page_info: res.data.user.edge_owner_to_timeline_media.page_info,
    };
    setData(newData);
  }

  return (
    <>
      <div className="container-post">
        <Post data={data.edges} />
      </div>
      {data.edges.length > 0 && (
        <button className="load-more" onClick={loadMore}>
          more
        </button>
      )}
    </>
  );
}

export default PostContainer;

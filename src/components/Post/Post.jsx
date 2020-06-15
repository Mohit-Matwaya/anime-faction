import '../../css/post.css';
import React from 'react';
import Rating from './Rating';
import Caption from './Caption';
import Content from './Content';

function Post(props) {
  const posts = props.data;

  return (
    <>
      {posts.map((edge, index) => {
        const post = edge.node;

        const likes = post.edge_media_preview_like.count;
        const comments = post.edge_media_to_comment.count;
        const views = post.video_view_count;

        const captions = post.edge_media_to_caption.edges[0].node.text; // always 1 item in []
        return (
          <div className="post" key={index}>
            <Content
              type={post.__typename}
              src={post.display_url}
              shortcode={post.shortcode}
            />
            <Rating likes={likes} comments={comments} views={views} />
            <Caption captions={captions} />
          </div>
        );
      })}
    </>
  );
}

export default Post;

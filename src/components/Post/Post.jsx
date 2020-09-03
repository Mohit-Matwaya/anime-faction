import React, { useEffect, useState } from "react";
import "../../css/post.scss";
import { fetchMorePosts, fetchPosts } from "../../fetchPosts";
import { Emoji } from "../utils";
import { Caption, ContentBody, Rating } from "./post.index";
import { Spinner } from "../ui";

function Post() {
  const [posts, setPosts] = useState({ edges: [] });
  useEffect(() => {
    fetchPosts({ error: "Failed to Load :( retry" }, setPosts);
  }, []);

  if (posts.error) return posts.error;
  if (!posts.page_info) return <Spinner />;

  return (
    <>
      <div className="container-post">
        {posts.edges.map(({ node }, index) => {
          const {
            __typename,
            thumbnail_src,
            shortcode,
            is_video,
            edge_media_preview_like,
            edge_media_to_comment,
            edge_media_to_caption,
            video_view_count,
          } = node;
          return (
            <div className="post" key={index}>
              <ContentBody
                type={__typename}
                src={thumbnail_src}
                shortcode={shortcode}
              />
              <Rating
                isVideo={is_video}
                likes={edge_media_preview_like.count}
                comments={edge_media_to_comment.count}
                views={video_view_count}
              />
              <Caption
                captions={edge_media_to_caption.edges[0].node.text}
              />
            </div>
          );
        })}
      </div>
      <button className="load-more" onClick={morePostsHandler}>
        <Emoji img="👇" /> Load More
      </button>
    </>
  );

  function morePostsHandler() {
    if (posts.page_info.has_next_page) {
      fetchMorePosts(data => {
        setPosts(cur => ({
          count: 218,
          page_info: data.page_info,
          edges: [...cur.edges, ...data.edges],
        }));
      }, posts.page_info.end_cursor);
    }
  }
}

export default Post;

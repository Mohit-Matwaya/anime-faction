import "../css/post.css";

import React, { useState, useEffect, useRef } from "react";

import { Emoji } from "../components/utils";
import { fetchPosts, fetchMorePosts, fetchVideo } from "../fetchPosts";
import MainContent from "./MainContent";

function Caption({ captions: stringedCaptions }) {
  const captions = stringedCaptions.split("\n");
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="post-caption">
      {!showMore
        ? captions.slice(0, 2).map((text) => <p key={text}>{text}</p>)
        : captions.map((text) => <p key={text}>{text}</p>)}
      <button className="show-more" onClick={handleShowMore}>
        {!showMore ? "More" : "Less"}
      </button>
    </div>
  );

  function handleShowMore() {
    setShowMore((p) => !p);
  }
}

const Rating = ({ isVideo, likes, comments, views }) => (
  <div className="post-rating">
    <p>
      <Emoji img="👍" />
      Liked by
      <strong>{likes}</strong>
      <span className="separator" />
      <Emoji img="💬" />
      <strong>{comments}</strong>
      {isVideo ? (
        <>
          <span className="separator" />
          <Emoji img="🎥" />
          <strong>{views}</strong>
        </>
      ) : null}
    </p>
  </div>
);

function Post() {
  const [posts, setPosts] = useState({ edges: [] });
  useEffect(() => {
    try {
      fetchPosts(setPosts);
    } catch {
      console.warn("retrying");
      fetchPosts(setPosts);
    } finally {
      console.log("got latest posts");
    }
  }, []);

  return (
    <>
      <div className="container-post">
        {posts.edges.map(
          (
            {
              node: {
                __typename,
                thumbnail_src,
                shortcode,
                is_video,
                edge_media_preview_like,
                edge_media_to_comment,
                edge_media_to_caption,
                video_view_count,
              },
            },
            index
          ) => (
            <div className="post" key={index}>
              <MainContent
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
              <Caption captions={edge_media_to_caption.edges[0].node.text} />
            </div>
          )
        )}
      </div>
      <button
        className="load-more"
        onClick={() => {
          if (posts.page_info.has_next_page)
            fetchMorePosts((data) => {
              const newEdges = [...posts.edges];
              data.edges.map((edge) => newEdges.push(edge));

              const newState = {
                count: 218,
                page_info: data.page_info,
                edges: newEdges,
              };

              setPosts(newState);
            }, posts.page_info.end_cursor);
        }}
      >
        <span role="img" aria-label="load more">
          👇
        </span>{" "}
        Load More
      </button>
    </>
  );
}

export default Post;

import * as React from "react";
import { useEffect, useState } from "react";
import { Spinner } from "components/ui";
import { fetchMorePosts, fetchPosts } from "functions/fetchPosts";
import { Caption, ContentBody, Rating } from "./";
import "./post.scss";

export default () => {
  const [posts, setPosts] = useState<Posts>({
    edges: [],
    error: "",
    page_info: { has_next_page: "", end_cursor: "" },
  });

  useEffect(() => {
    fetchPosts({ error: "Failed to Load :( retry" }, setPosts);
  }, []);

  if (posts.error) return <p>{posts.error}</p>;
  if (!posts.page_info.has_next_page) return <Spinner />;

  return (
    <>
      <div className="container-post">
        {posts.edges.map(({ node }, index) => {
          const {
            shortcode,
            is_video,
            edge_media_preview_like,
            edge_media_to_comment,
            edge_media_to_caption,
            video_view_count,
          } = node;
          return (
            <div className="post" key={index}>
              <ContentBody shortcode={shortcode} />
              <Rating
                isVideo={is_video}
                likes={edge_media_preview_like.count}
                comments={edge_media_to_comment.count}
                views={video_view_count}
              />
              <Caption captions={edge_media_to_caption.edges[0].node.text} />
            </div>
          );
        })}
      </div>
      <button className="load-more" onClick={morePostsHandler}>
        Load More
      </button>
    </>
  );

  function morePostsHandler() {
    const { page_info } = posts;
    const { end_cursor, has_next_page } = page_info;
    if (has_next_page) {
      fetchMorePosts((data: Posts) => {
        setPosts((cur) => ({
          ...cur,
          page_info: data.page_info,
          edges: [...cur.edges, ...data.edges],
        }));
      }, end_cursor);
    }
  }
};

interface Posts {
  edges: Array<PostEdge | never>;
  error: string;
  page_info: {
    has_next_page: string;
    end_cursor: string;
  };
  count?: number;
}

interface PostEdge {
  node: {
    shortcode: string;
    is_video: boolean;
    edge_media_preview_like: { count: number };
    edge_media_to_comment: { count: number };
    edge_media_to_caption: { edges: Array<{ node: { text: string } }> };
    video_view_count: number;
  };
}

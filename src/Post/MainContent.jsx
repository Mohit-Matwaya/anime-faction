import React, { useState, useRef } from "react";
import { useEffect } from "react";

function fetchContent(shortcode) {
  return new Promise((res, rej) => {
    try {
      const query_hash = "552bb33f4e58c7805d13d4f95da7d3a1";
      fetch(
        `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables=%7B%22shortcode%22%3A%22${shortcode}%22%2C%22child_comment_count%22%3A3%2C%22fetch_comment_count%22%3A40%2C%22parent_comment_count%22%3A24%2C%22has_threaded_comments%22%3Atrue%7D`
      )
        .then((res) => res.json())
        .then((data) => res(data));
    } catch (er) {
      rej(console.warn("Failed"));
    }
  });
}

function MainContent(props) {
  const { type, shortcode } = props;
  const SELF = useRef(null);
  const [URL, setURL] = useState(null);

  useEffect(() => {
    const target = SELF.current;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          const data = await fetchContent(shortcode);
          if (type === "GraphVideo") {
            setURL(data.data.shortcode_media.video_url);
          } else if (type === "GraphSidecar") {
            setURL(data.data.shortcode_media.edge_sidecar_to_children.edges);
          } else {
            setURL(data.data.shortcode_media.display_url);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "1080px 0px" }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [SELF, shortcode, type]);

  return (
    <div className="post-content" ref={SELF}>
      {type === "GraphVideo" ? (
        <video src={URL} controls></video>
      ) : type === "GraphSidecar" && URL ? (
        <div className="sidecar">
          {URL.map((edge, index) => (
            <img key={index} src={edge.node.display_url} alt="" />
          ))}
        </div>
      ) : (
        <img src={URL} alt="img" />
      )}
    </div>
  );
}

export default MainContent;

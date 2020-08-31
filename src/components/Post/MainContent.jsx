import React, { useState, useRef, useEffect } from "react";
import { Emoji } from "../utils";

import { fetchContent } from "../../fetchPosts";

const MainContent = ({ type, shortcode }) => {
  const SELF = useRef(null);
  const Slider = useRef(null);
  const [URL, setURL] = useState(null);

  useEffect(() => {
    const { current: target } = SELF;
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

    return () => target && observer.unobserve(target);
  }, [SELF, shortcode, type]);

  //render() //@return
  function render() {
    switch (type) {
      case "GraphVideo":
        return <video src={URL} controls></video>;
      case "GraphSidecar":
        return (
          URL && (
            <div className="post-sidecar-container">
              <div className="post-sidecar" ref={Slider}>
                {URL.map(({ node }) => (
                  <img
                    key={node.display_url}
                    src={node.display_url}
                    alt="_blankalt"
                  />
                ))}
              </div>
              <button className="control" onClick={() => handleSlide(-1)}>
                <Emoji img="◀" />
              </button>
              <button className="control" onClick={() => handleSlide(1)}>
                <Emoji img="▶" />
              </button>
            </div>
          )
        );
      default:
        return <img src={URL} alt="img" />;
    }
  }

  return (
    <div className="post-content" ref={SELF}>
      {render()}
    </div>
  );

  function handleSlide(dir) {
    Slider.current.scrollLeft += dir * Slider.current.offsetWidth;
  }
};

export default MainContent;

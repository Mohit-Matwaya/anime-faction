import React, {useState, useRef} from "react";
import {useEffect} from "react";
import {Emoji} from "../components/utils";

import {fetchContent} from "../fetchPosts";

function MainContent(props) {
  const {type, shortcode} = props;
  const SELF = useRef(null);
  const Slider = useRef(null);
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
      {threshold: 0, rootMargin: "1080px 0px"}
    );

    if (target) observer.observe(target);

    return () => target && observer.unobserve(target);
  }, [SELF, shortcode, type]);

  function handleSlide(dir) {
    Slider.current.scrollLeft += dir * Slider.current.offsetWidth;
  }

  return (
    <div className="post-content" ref={SELF}>
      {type === "GraphVideo" ? (
        <video src={URL} controls></video>
      ) : type === "GraphSidecar" && URL ? (
        <div className="post-sidecar-container">
          <div className="post-sidecar" ref={Slider}>
            {URL.map((edge, index) => (
              <img key={index} src={edge.node.display_url} alt=""/>
            ))}
          </div>
          <button className="control" onClick={() => handleSlide(-1)}>
            <Emoji img="◀"/>
          </button>
          <button className="control" onClick={() => handleSlide(1)}>
            <Emoji img="▶"/>
          </button>
        </div>
      ) : (
        <img src={URL} alt="img"/>
      )}
    </div>
  );
}

export default MainContent;

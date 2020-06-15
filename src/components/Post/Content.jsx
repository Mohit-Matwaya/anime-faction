import React, { useState, useEffect } from 'react';
import { fetchPostData } from '../../fetchPosts';
import Sidecar from './Sidecar';

export default function MainContent(props) {
  const { type, src, shortcode } = props;
  const [videoURL, setVideoURL] = useState(null);
  const [sidecarURL, setSidecarURL] = useState([]);

  const handleClick = async () => {
    if (type === 'GraphVideo' && videoURL == null) {
      const res = await fetchPostData(shortcode);
      setVideoURL(res.data.shortcode_media.video_url);
    }
  };

  useEffect(() => {
    (async function () {
      if (type === 'GraphSidecar') {
        const res = await fetchPostData(shortcode);
        setSidecarURL(res.data.shortcode_media.edge_sidecar_to_children.edges);
      }
    })();
  }, [type, shortcode]);

  return (
    <div className="post-content" onClick={handleClick}>
      {videoURL && type === 'GraphVideo' ? (
        <video
          onBlur={ev => ev.target.pause()}
          onPlay={ev => ev.target.focus()}
          src={videoURL}
          controls
          autoPlay
          loop
        ></video>
      ) : sidecarURL.length > 0 && type === 'GraphSidecar' ? (
        <Sidecar edges={sidecarURL} />
      ) : (
        <img src={src} alt="" />
      )}
    </div>
  );
}

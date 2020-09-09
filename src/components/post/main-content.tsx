import React, { useEffect, useState } from "react";
import { fetchContent } from "functions/fetchPosts";
import GraphSidecar from "components/sidecar";

interface Props {
  shortcode: string;
}

const MainContent: React.FC<Props> = ({ shortcode }) => {
  const [[URL, type], dispatch] = useState([undefined, "loading"]);

  useEffect(() => {
    const main = async () => {
      const { shortcode_media } = await fetchContent(shortcode);
      const { __typename: type } = shortcode_media;
      console.log(shortcode, type);

      switch (type) {
        case "GraphVideo":
          dispatch([shortcode_media.video_url, type]);
          break;
        case "GraphSidecar":
          dispatch([shortcode_media.edge_sidecar_to_children.edges, type]);
          break;
        default:
          dispatch([shortcode_media.display_url, type]);
          break;
      }
    };
    main();
  }, [shortcode]);

  //render() //@return
  function render() {
    switch (type) {
      case "GraphVideo":
        return <video src={URL} controls></video>;
      case "GraphSidecar":
        return <GraphSidecar URL={URL} />;
      case "loading":
        return "Loading..!";
      default:
        return <img src={URL} alt="img" loading="lazy" />;
    }
  }
  return <div className="post-content">{render()}</div>;
};

export default MainContent;

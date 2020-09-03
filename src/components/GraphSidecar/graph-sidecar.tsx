import "./graph-sidecar.scss";
import * as React from "react";
import { useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface Props {
  URL: Array<{ node: { display_url: string } }> | undefined;
}

const GraphSidecar: React.FC<Props> = ({ URL }) => {
  const Slider = useRef<HTMLDivElement>(null);

  if (!URL) return <p>Error</p>;

  return (
    <div className="post-sidecar-container">
      <div className="post-sidecar" ref={Slider}>
        {URL.map(({ node }) => (
          <div key={node.display_url} className="post-sidecar__slide">
            <img src={node.display_url} alt="_blankalt" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="control" onClick={() => handleSlide(-1)}>
        <FaArrowCircleLeft />
      </div>
      <div className="control" onClick={() => handleSlide(1)}>
        <FaArrowCircleRight />
      </div>
    </div>
  );

  function handleSlide(dir: number) {
    if (Slider && Slider.current) {
      Slider.current.scrollLeft += dir * Slider.current.offsetWidth;
    }
  }
};

export default GraphSidecar;

import Emoji from '../Emoji';
import React, { useState, useRef, useEffect } from 'react';

function Sidecar(props) {
  const { edges } = props;
  const slider = useRef(null);
  const [slideNum, setSlideNum] = useState(0);

  useEffect(() => {
    slider.current.onwheel = ev => {
      if (ev.shift) return false;
    };
  }, []);

  useEffect(() => {
    const _width = parseInt(
      getComputedStyle(slider.current).getPropertyValue('width')
    );
    console.log('flag');
    slider.current.scrollLeft = _width * slideNum;
  }, [slideNum]);

  function slide(dir = 0) {
    setSlideNum(prev => {
      prev += dir;
      if (prev > edges.length - 1) prev = edges.length - 1;
      if (prev < 0) prev = 0;
      return prev;
    });
  }

  return (
    <div className="sidecar" ref={slider}>
      {edges.map((edge, index) => (
        <img
          key={index}
          src={edge.node.display_url}
          alt={edge.node.display_url}
        />
      ))}
      <button onClick={() => slide(-1)}>
        <Emoji img="◀" />
      </button>
      <button onClick={() => slide(1)}>
        <Emoji img="▶" />
      </button>
    </div>
  );
}

export default Sidecar;

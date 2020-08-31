import React, { useState } from "react";

const Caption = ({ captions: stringedCaptions }) => {
  const captions = stringedCaptions.split("\n");
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="post-caption">
      {!showMore
        ? captions.slice(0, 2).map(text => <p key={text}>{text}</p>)
        : captions.map(text => <p key={text}>{text}</p>)}
      <button className="show-more" onClick={handleShowMore}>
        {!showMore ? "More" : "Less"}
      </button>
    </div>
  );

  function handleShowMore() {
    setShowMore(p => !p);
  }
};

export default Caption;

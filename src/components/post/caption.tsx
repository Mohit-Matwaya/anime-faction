import React, { useReducer } from "react";

interface Props {
  captions: string;
}

const Caption: React.FC<Props> = ({ captions: stringedCaptions }) => {
  const captions = stringedCaptions.split("\n");
  const [showMore, handleShowMore] = useReducer((p) => !p, false);
  return (
    <div className="post-caption">
      {!showMore ? (
        <>
          {captions.slice(0, 2).map((text) => (
            <p key={text}>{text}</p>
          ))}
          <button className="show-more" onClick={handleShowMore}>
            More
          </button>
        </>
      ) : (
        <>
          {captions.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <button className="show-more" onClick={handleShowMore}>
            Less
          </button>
        </>
      )}
    </div>
  );
};

export default Caption;

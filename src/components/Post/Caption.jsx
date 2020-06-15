import React, { useState } from 'react';

export default function Caption(props) {
  const captions = props.captions.split('\n');
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="post-caption">
      {showMore
        ? captions.map((text, index) => <p key={index}>{text}</p>)
        : captions.slice(0, 2).map((text, index) => <p key={index}>{text}</p>)}
      <button
        className="show-more"
        onClick={() => setShowMore(state => !state)}
      >
        Show {showMore ? 'less' : 'more'}
      </button>
    </div>
  );
}

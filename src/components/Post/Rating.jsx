import React from 'react';
import Emoji from '../Emoji';

export default function Rating(props) {
  const { likes, comments, views } = props;

  return (
    <div className="post-rating">
      <Emoji img="❤️" />
      {likes}
      <Emoji img="💬" />
      {comments}
      {views !== undefined && (
        <>
          <Emoji img="🎥" />
          {views}
        </>
      )}
    </div>
  );
}

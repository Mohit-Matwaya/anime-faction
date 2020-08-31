import React from "react";

import { Emoji, Separator } from "../utils";

const Rating = ({ isVideo, likes, comments, views }) => (
  <p className="post-rating">
    <span>
      <Emoji img="👍" />
      Likes
      <strong>{likes}</strong>
    </span>
    <Separator />
    <span>
      <Emoji img="💬" />
      <strong>{comments}</strong>
    </span>
    <Separator />
    {isVideo && (
      <span>
        <Emoji img="🎥" />
        <strong>{views}</strong>
      </span>
    )}
  </p>
);

export default Rating;

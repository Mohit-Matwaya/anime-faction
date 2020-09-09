import { Separator } from "components/utils";
import React from "react";
import { FaComment, FaHeart, FaVideo } from "react-icons/fa";

interface Props {
  isVideo: boolean;
  likes: number;
  comments: number;
  views: number;
}

const Rating: React.FC<Props> = ({ isVideo, likes, comments, views }) => (
  <p className="post-rating">
    <span>
      <FaHeart />
      <span>Liked by</span>
      <strong>{likes}</strong>
    </span>
    <Separator />
    <span>
      <FaComment /> <strong>{comments}</strong>
    </span>
    <Separator />
    {isVideo && (
      <span>
        <FaVideo />
        <strong>{views}</strong>
      </span>
    )}
  </p>
);

export default Rating;

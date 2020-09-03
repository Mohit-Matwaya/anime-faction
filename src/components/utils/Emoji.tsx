import React from "react";

interface Props extends React.HTMLProps<HTMLSpanElement> {
  img: string;
}

const Emoji: React.FC<Props> = ({ img, ...props }) => (
  <span {...props} role="img" aria-label={img}>
    {img}
  </span>
);

export default Emoji;

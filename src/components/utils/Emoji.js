import React from "react";

export default ({img, ...props}) => <span {...props} role="img" aria-label={img}>{img}</span>
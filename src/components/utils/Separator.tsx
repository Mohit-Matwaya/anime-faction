import React from "react";
import  styled  from "styled-components";

export default () => <Separator />;

const Separator = styled.span`
  margin-bottom: -4px;
  display: inline-block;
  height: calc(1ch + 1rem);
  color: #dadce8;
  background-color: currentColor;
  border: 1px solid currentColor;
`;

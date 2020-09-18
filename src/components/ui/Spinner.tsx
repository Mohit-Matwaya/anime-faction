import styled from "styled-components";
import React from "react";
import { FaCircleNotch } from "react-icons/fa";

const Loader: React.FC = () => {
  return (
    <Container>
      <FaCircleNotch />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  display: grid;
  place-items: center;
  width: 20vmin;
  height: 20vmin;
  svg {
    font-size: 32px;
    animation: Spin 0.75s infinite linear;
  }
  @keyframes Spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export default Loader;

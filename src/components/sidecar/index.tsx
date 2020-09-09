import * as React from "react";
import { useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  URL: Array<{ node: { display_url: string } }> | undefined;
}
const GraphSidecar: React.FC<Props> = ({ URL }) => {
  const Slider = useRef<HTMLDivElement>(null);

  if (!URL) return <p>Error</p>;

  return (
    <Container>
      <SideCar ref={Slider}>
        {URL.map(({ node }) => (
          <Slide key={node.display_url}>
            <img src={node.display_url} alt="_blankalt" loading="lazy" />
          </Slide>
        ))}
      </SideCar>
      <p>
        {Slider.current &&
          (Slider.current?.scrollLeft / Slider.current?.offsetWidth).toString()}
      </p>
      <Control onClick={() => handleSlide(-1)}>
        <FaArrowCircleLeft />
      </Control>
      <Control onClick={() => handleSlide(1)}>
        <FaArrowCircleRight />
      </Control>
    </Container>
  );

  function handleSlide(dir: number) {
    if (Slider?.current) {
      Slider.current.scrollLeft += dir * Slider.current.offsetWidth;
    }
  }
};

const Container = styled.div`
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Control = styled.div`
  padding: 0.8em 0.4em;
  position: absolute;
  top: 50%;
  color: rgba(0, 0, 0, 0.7);
  font-size: 2.5rem;
  transform: translateY(-50%);
  &:first-of-type {
    left: -5px;
  }
  &:last-of-type {
    right: -5px;
  }
`;

const SideCar = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overflow-x: scroll;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-items: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export default GraphSidecar;

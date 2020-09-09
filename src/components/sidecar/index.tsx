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
`;

const SideCar = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.div`
  display: flex;
  justify-items: center;
  flex: 0 0 100%;
  scrollbar-width: 0px;
  scroll-snap-stop: always;
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

export default GraphSidecar;

import * as React from 'react';
import { useState, useEffect } from 'react';
import './styles.scss';

interface Props {
  isHidden: boolean;
  animationStart: string;
  animationEnd: string;
}

const Transition: React.FC<Props> = ({
  animationStart,
  animationEnd,
  isHidden,
  children,
}) => {
  return (
    <div
      style={{
        transform: 'translateY(-100px)',
        transition: 'transform .2s ease',
      }}
      onAnimationEnd={() => {}}
    >
      {children}
    </div>
  );
};

export default Transition;

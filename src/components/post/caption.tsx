import * as React from 'react';
import { useReducer } from 'react';

const Caption = ({ captions }: { captions: string }) => {
  const [showMore, handleShowMore] = useReducer(p => !p, false);

  return (
    <>
      <div className='post-caption'>
        {captions
          .split('\n')
          .slice(0, 2)
          .map(text => (
            <p key={text}>{text}</p>
          ))}
        <button className='show-more' onClick={handleShowMore}>
          More
        </button>
      </div>
      <div
        style={{
          transform: `translateY(${showMore ? '0' : '100%'})`,
          transition: 'transform .2s ease-in',
        }}
        className='post-caption-open'
      >
        <div className='post-caption__text'>
          {captions.split('\n').map((text, idx) => (
            <p key={text + idx}>{text}</p>
          ))}
          <button className='show-more' onClick={handleShowMore}>
            Less
          </button>
        </div>
      </div>
    </>
  );
};

export default Caption;

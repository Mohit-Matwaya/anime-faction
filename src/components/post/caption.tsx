import React, { useReducer } from 'react';

const Caption = ({ captions }: { captions: string }) => {
    const [showMore, handleShowMore] = useReducer(p => !p, false);

    return !showMore ? (
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
    ) : (
        <div className='post-caption'>
            {captions.split('\n').map(text => (
                <p key={text}>{text}</p>
            ))}
            <button className='show-more' onClick={handleShowMore}>
                Less
            </button>
        </div>
    );
};

export default Caption;

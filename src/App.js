import React from 'react';
import PostContainer from './components/Post/PostContainer';
import Hero from './hero';

function App() {
  return (
    <>
      <Hero />
      <h3>Latest Posts</h3>
      <PostContainer />
    </>
  );
}

export default App;

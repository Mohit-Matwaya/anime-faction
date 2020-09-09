import React from "react";
import { Post } from "components/post";
import Hero from "components/hero";

function App() {
  return (
    <>
      <Hero />
      <h3>Latest Posts</h3>
      <Post />
    </>
  );
}

export default App;

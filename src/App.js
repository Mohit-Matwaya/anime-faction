import React from "react";
import { Post } from "./components/Post";
import Hero from "./hero";

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

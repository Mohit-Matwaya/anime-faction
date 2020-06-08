import React from 'react';
import './css/navbar.css';

class Navbar extends React.Component {
  render() {
    return <>
      <nav>
        <ul>
          <li>
            <img src="./assets/hero-logo.jpg" alt="logo" />
          </li>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Graphs</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
      </nav>
    </>
  }
}

export default Navbar;

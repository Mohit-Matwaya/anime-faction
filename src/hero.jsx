import React from 'react';
import Navbar from './navbar';
import './css/hero.css'

function Hero() {
  return <div id='hero'>
    <Navbar />
    <div className='container-hero'>
      <h1>Anime<br />Faction</h1>
      <p>"In this world, wherever there is light - there are also shadows.
      As long as the concept of winners exists, there must also be losers.
      The selfish desire of wanting to maintain peace causes wars, and hatred is born to <span>protect love.</span>"</p>
      <a href="//www.instagram.com/anime._.faction/" target='_blank' rel='noopener noreferrer'>Instagram page&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>➜</span></a>
    </div>
  </div>
}

export default Hero;

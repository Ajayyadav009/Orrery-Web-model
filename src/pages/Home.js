import React from 'react';
import './Home.css';
import { Search, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <div className="header-top">
          <span className="logo">Explore</span>
          <div className="search-container">
            <input type="text" placeholder="Search the cosmos..." />
            <Search className="search-icon" size={20} />
          </div>
        </div>
        <nav>
          <a href="#news">News & Events</a>
          <a href="#multimedia">Multimedia</a>
          <a href="#orrery-plus">Orrery+</a>
        </nav>
      </header>

      <main>
        <h1>Orrery Web Model</h1>
        <p>Earth's first interactive web-based model of our solar system, launching soon.</p>
        <a href="#explore" className="explore-button">
          Explore The Model
          <ArrowRight size={20} />
        </a>

        <div className="features">
          <div className="feature">
            <Star size={24} />
            <h2>Ways to Participate</h2>
            <p>Get involved in our Orrery project</p>
          </div>
          <div className="feature">
            <Star size={24} />
            <h2>Virtual Tour Program</h2>
            <p>Explore our solar system from home</p>
          </div>
          <div className="feature">
            <Star size={24} />
            <h2>Why Orrery?</h2>
            <p>Discover the importance of our model</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
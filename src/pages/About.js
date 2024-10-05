import React from 'react';
import './About.css'; // Ensure you create this CSS file for styling
import Adarsh from '../images/Adarsh.jpg'; // Updated path
import Ajay from '../images/Ajay.jpg'; // Updated path
import Asheesh from '../images/Asheesh.jpg'; // Updated path
import Yuvraj from '../images/Yuvraj.jpg'; // Updated path
import Nikhil from '../images/Nikhil2.jpg'; // Updated path

const About = () => {
  return (
    <div className="about-container">
      <h1>About This Application</h1>

      <section className="about-section">
        <h2>Introduction</h2>
        <p>
          Welcome to our Solar System Exploration application! This interactive platform is designed to take you on a captivating journey through our solar system. With detailed information about each planet, engaging visuals, and an immersive 3D experience, our goal is to educate and inspire users of all ages about the wonders of space. Whether you're a student, an astronomy enthusiast, or simply curious about the cosmos, our app provides a comprehensive and enjoyable way to explore the planets and learn more about the universe we inhabit.
        </p>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li>**Interactive 3D Model:** Explore a realistic 3D representation of the solar system.</li>
          <li>**Detailed Planet Information:** Get in-depth information about each planet, including size, distance from the sun, and unique characteristics.</li>
          <li>**User-Friendly Interface:** Enjoy an easy-to-navigate layout designed for users of all ages.</li>
          <li>**Educational Content:** Access informative articles and facts about space exploration, planetary science, and more.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>How to Use</h2>
        <p>
          To begin your exploration, simply click on the "Solar System" tab in the navigation bar. You can interact with the planets by clicking on them to learn more about each one. Use the controls to zoom in and out, as well as to rotate the view for a better perspective.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Explore the Solar System?</h2>
        <p>
          The solar system is a vast and fascinating place, filled with mysteries waiting to be uncovered. By exploring the planets, we not only satisfy our curiosity but also gain valuable knowledge that can inspire future generations of scientists, astronomers, and explorers. Understanding our place in the universe can help us appreciate the beauty and complexity of our world and the cosmos beyond.
        </p>
      </section>

      <section className="about-section">
        <h2>Contributors</h2>
        <div className="contributors-container">
          
          <div className="contributor">
            <img src={Adarsh} alt="Adarsh" className="contributor-image" />
            <h3>Adarsh</h3>
            <p></p>
          </div>
          <div className="contributor">
            <img src={Ajay} alt="Ajay" className="contributor-image" />
            <h3>Ajay</h3>
            <p> </p>
          </div>
          <div className="contributor">
            <img src={Asheesh} alt="Asheesh" className="contributor-image" />
            <h3>Asheesh</h3>
            <p> </p>
          </div>
          <div className="contributor">
            <img src={Yuvraj} alt="Yuvraj" className="contributor-image" />
            <h3>Yuvraj</h3>
            <p> </p>
          </div>
          <div className="contributor">
            <img src={Nikhil} alt="Nikhil2" className="contributor-image" />
            <h3>Nikhil</h3>
            <p> </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out to us at: <a href="mailto:info@solarsystemexploration.com">info@solarsystemexploration.com</a>
        </p>
      </section>
    </div>
  );
};

export default About;

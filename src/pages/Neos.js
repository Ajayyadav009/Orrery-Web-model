import React from 'react';
import './Neos.css'; // Ensure you have the correct CSS file for styling
import ApophisImage from '../images/Apophis.jpg'; // Correct path to your Apophis image
import ErosImage from '../images/Eros.jpg'; // Correct path to your Eros image
import BennuImage from '../images/Bennu.jpg'; // Correct path to your Bennu image

const Neos = () => {
  return (
    <div className="neos-container">
      <h1>Near Earth Objects (NEOs)</h1>

      <section className="neos-section">
        <h2>Introduction to NEOs</h2>
        <p>
          Near Earth Objects (NEOs) are asteroids and comets that have orbits that bring them close to Earth. Understanding NEOs is essential for planetary defense and studying the early solar system.
        </p>
      </section>

      <section className="neos-section">
        <h2>Classification of NEOs</h2>
        <p>
          NEOs are classified into different categories based on their orbits, including Atira, Amor, Apollo, and Aten.
        </p>
      </section>

      <section className="neos-section">
        <h2>Famous Near Earth Objects</h2>

        {/* Apophis Section */}
        <div className="neos-item">
          <img src={ApophisImage} alt="Apophis" className="asteroid-image" />
          <div className="asteroid-info">
            <h3>Apophis Orbital Characteristics</h3>
            <ul>
              <li><strong>Epoch:</strong> 1-Jul-2021 (2459396.5 JD)</li>
              <li><strong>Apapsis:</strong> 1.0993 AU (1.6446×10<sup>8</sup> km)</li>
              <li><strong>Periapsis:</strong> 0.7461 AU (1.1161×10<sup>8</sup> km)</li>
              <li><strong>Semi-major axis:</strong> 0.9227 AU (1.3803×10<sup>8</sup> km)</li>
              <li><strong>Eccentricity:</strong> 0.1914348</li>
              <li><strong>Inclination:</strong> 3.3389°</li>
              <li><strong>Longitude of asc. node:</strong> 203.97°</li>
              <li><strong>Argument of periapsis:</strong> 126.59°</li>
              <li><strong>Orbital period:</strong> 323.735 days</li>
              <li><strong>Avg. orbital speed:</strong> 30.72 km/s</li>
            </ul>

            <h3>Apophis Physical Characteristics</h3>
            <ul>
              <li><strong>Mean diameter:</strong> 0.3400 km</li>
              <li><strong>Rotation period (synodic):</strong> 30.400 hours</li>
              <li><strong>Albedo:</strong> 0.230</li>
            </ul>
          </div>
        </div>

        {/* Eros Section */}
        <div className="neos-item">
          <img src={ErosImage} alt="Eros" className="asteroid-image" />
          <div className="asteroid-info">
            <h3>Eros Orbital Characteristics</h3>
            <ul>
              <li><strong>Epoch:</strong> 27-Apr-2021 (2459331.5 JD)</li>
              <li><strong>Apapsis:</strong> 1.783 AU (2.668×10<sup>8</sup> km)</li>
              <li><strong>Periapsis:</strong> 1.133 AU (1.695×10<sup>8</sup> km)</li>
              <li><strong>Semi-major axis:</strong> 1.458 AU (2.181×10<sup>8</sup> km)</li>
              <li><strong>Eccentricity:</strong> 0.2229</li>
              <li><strong>Inclination:</strong> 10.829°</li>
              <li><strong>Longitude of asc. node:</strong> 304.294°</li>
              <li><strong>Argument of periapsis:</strong> 178.9°</li>
              <li><strong>Orbital period:</strong> 643.219 days</li>
              <li><strong>Avg. orbital speed:</strong> 24.36 km/s</li>
            </ul>

            <h3>Eros Physical Characteristics</h3>
            <ul>
              <li><strong>Mean diameter:</strong> 16.84 km</li>
              <li><strong>Rotation period (synodic):</strong> 5.270 hours</li>
              <li><strong>Albedo:</strong> 0.25</li>
            </ul>
          </div>
        </div>

        {/* Bennu Section */}
        <div className="neos-item">
          <img src={BennuImage} alt="Bennu" className="asteroid-image" />
          <div className="asteroid-info">
            <h3>Bennu Orbital Characteristics</h3>
            <ul>
              <li><strong>Epoch:</strong> 31-Jul-2021 (2459396.5 JD)</li>
              <li><strong>Apapsis:</strong> 1.355 AU (2.027×10<sup>8</sup> km)</li>
              <li><strong>Periapsis:</strong> 0.897 AU (1.342×10<sup>8</sup> km)</li>
              <li><strong>Semi-major axis:</strong> 1.126 AU (1.685×10<sup>8</sup> km)</li>
              <li><strong>Eccentricity:</strong> 0.2037</li>
              <li><strong>Inclination:</strong> 6.034°</li>
              <li><strong>Longitude of asc. node:</strong> 2.060°</li>
              <li><strong>Argument of periapsis:</strong> 66.223°</li>
              <li><strong>Orbital period:</strong> 436.604 days</li>
              <li><strong>Avg. orbital speed:</strong> 28.68 km/s</li>
            </ul>

            <h3>Bennu Physical Characteristics</h3>
            <ul>
              <li><strong>Mean diameter:</strong> 0.490 km</li>
              <li><strong>Rotation period (synodic):</strong> 4.296 hours</li>
              <li><strong>Albedo:</strong> 0.045</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="neos-section">
        <h2>Potential Threats</h2>
        <p>
          NEOs pose potential risks to Earth, including impacts that could have catastrophic consequences. Historical impacts have significantly affected life on our planet.
        </p>
      </section>

      <section className="neos-section">
        <h2>Monitoring and Tracking NEOs</h2>
        <p>
          Astronomers monitor NEOs using advanced telescopes and radar systems. Organizations like NASA's Planetary Defense Coordination Office work to detect potential threats.
        </p>
      </section>

      <section className="neos-section">
        <h2>Mitigation Strategies</h2>
        <p>
          Strategies such as deflection missions and evacuation plans are being researched to prevent potential impacts from NEOs.
        </p>
      </section>

      <section className="neos-section">
        <h2>Fun Facts</h2>
        <ul>
          <li>There are over 28,000 known NEOs.</li>
          <li>The largest known NEO is 1036 Ganymed, with a diameter of 32 kilometers.</li>
          <li>Fictional NEOs like the asteroid in *Armageddon* have appeared in popular culture.</li>
        </ul>
      </section>
    </div>
  );
};

export default Neos;

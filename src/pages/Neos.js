import React from 'react';
import './Neos.css'; // Ensure you create this CSS file for styling

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
        <ul>
          <li><strong>Apophis:</strong> Known for its close approaches.</li>
          <li><strong>Bennu:</strong> Target of NASA's OSIRIS-REx mission.</li>
          <li><strong>2004 MN4:</strong> Another asteroid with a close approach.</li>
        </ul>
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
          <li>There are over [insert number] known NEOs.</li>
          <li>The largest known NEO is [insert name].</li>
          <li>Fictional NEOs like [insert names] have appeared in popular culture.</li>
        </ul>
      </section>
    </div>
  );
};

export default Neos;

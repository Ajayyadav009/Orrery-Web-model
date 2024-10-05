import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';

const PlanetInfo = ({ planet, onClose }) => {
  if (!planet) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      color: 'white',
      maxWidth: '400px',
      zIndex: 1000
    }}>
      <h2>{planet.name}</h2>
      <p>Radius: {planet.radius} Earth radii</p>
      <p>Distance from Sun: {planet.distance} AU</p>
      <p>Orbit Speed: {planet.orbitSpeed} Earth years</p>
      <p>Rotation Speed: {planet.rotationSpeed} Earth days</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [showLabels, setShowLabels] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showPlanetInfo, setShowPlanetInfo] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const planetMeshesRef = useRef([]);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    camera.position.z = 100;

    // Planet data (distances scaled for visualization)
    const planets = [
      { name: 'Mercury', radius: 0.5, distance: 5, color: 0xC0C0C0, orbitSpeed: 0.241, rotationSpeed: 0.017 },
      { name: 'Venus', radius: 0.9, distance: 7, color: 0xFFA500, orbitSpeed: 0.615, rotationSpeed: 0.004 },
      { name: 'Earth', radius: 1, distance: 10, color: 0x0000FF, orbitSpeed: 1, rotationSpeed: 0.017 },
      { name: 'Mars', radius: 0.6, distance: 15, color: 0xFF0000, orbitSpeed: 1.88, rotationSpeed: 0.025 },
      { name: 'Jupiter', radius: 2, distance: 25, color: 0xFFA500, orbitSpeed: 11.86, rotationSpeed: 0.045 },
      { name: 'Saturn', radius: 1.8, distance: 35, color: 0xFFD700, orbitSpeed: 29.46, rotationSpeed: 0.039 },
      { name: 'Uranus', radius: 1.2, distance: 45, color: 0x00FFFF, orbitSpeed: 84.01, rotationSpeed: 0.03 },
      { name: 'Neptune', radius: 1.1, distance: 55, color: 0x0000FF, orbitSpeed: 164.8, rotationSpeed: 0.028 },
    ];

    // Create sun
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create planets and orbits
    const planetMeshes = planets.map(planet => {
      const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: planet.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.name = planet.name;
      scene.add(mesh);

      // Create orbit (for visualization)
      const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.1, planet.distance + 0.1, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, opacity: 0.2, transparent: true });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      // Create label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = '24px Arial';
      context.fillStyle = 'white';
      context.fillText(planet.name, 0, 24);
      const texture = new THREE.CanvasTexture(canvas);
      const labelMaterial = new THREE.SpriteMaterial({ map: texture });
      const label = new THREE.Sprite(labelMaterial);
      label.position.set(planet.distance + planet.radius + 1, planet.radius + 1, 0);
      label.scale.set(5, 2.5, 1);
      mesh.add(label);
      label.visible = showLabels;

      return { mesh, label, angle: 0 };
    });
    planetMeshesRef.current = planetMeshes;

    // Raycaster for planet selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(planetMeshes.map(p => p.mesh));

      if (intersects.length > 0) {
          const hoveredPlanet = intersects[0].object;
          const planetData = planets.find(p => p.name === hoveredPlanet.userData.name);
          
          if (planetData) {
              setSelectedPlanet(planetData);
              setShowPlanetInfo(true);
          }
      } else {
          setShowPlanetInfo(false);
          setSelectedPlanet(null);
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0001;

      planetMeshes.forEach((planet, index) => {
        // Update planet's angle for orbit
        const orbitSpeed = 1 / planets[index].orbitSpeed;
        planet.angle += orbitSpeed * 0.001;

        // Update planet position based on its orbit
        planet.mesh.position.x = Math.cos(planet.angle) * planets[index].distance;
        planet.mesh.position.z = Math.sin(planet.angle) * planets[index].distance;

        // Update planet's rotation on its axis
        planet.mesh.rotation.y += planets[index].rotationSpeed;

        planet.label.visible = showLabels;
      });

      TWEEN.update();
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [showLabels]);

  const handleCloseInfo = () => {
    setShowPlanetInfo(false);
  };

  return (
    <div>
      <div ref={mountRef} />
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }}>
        <label>
          <input
            type="checkbox"
            checked={showLabels}
            onChange={() => setShowLabels(!showLabels)}
          />
          Show Planet Labels
        </label>
      </div>
      {showPlanetInfo && (
        <PlanetInfo planet={selectedPlanet} onClose={handleCloseInfo} />
      )}
    </div>
  );
};

export default SolarSystem;

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
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showPlanetInfo, setShowPlanetInfo] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const planetMeshesRef = useRef([]);

  const handleCloseInfo = () => {
    setShowPlanetInfo(false);
    setHoveredPlanet(null);

    if (selectedPlanet) {
      const planetMesh = planetMeshesRef.current.find(p => p.mesh.userData.name === selectedPlanet.name)?.mesh;
      if (planetMesh) {
        new TWEEN.Tween(planetMesh.scale)
          .to({ x: 1, y: 1, z: 1 }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      }
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a large sphere for the starry background
    const starGeometry = new THREE.SphereGeometry(500, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000, // Black background
      side: THREE.BackSide,
      map: new THREE.TextureLoader().load('https://i.imgur.com/8DkguUq.jpg'), // Star texture
    });

    const stars = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(stars);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    camera.position.z = 100;

    const planets = [
      { name: 'Mercury', radius: 0.5, distance: 5, color: 0xC0C0C0, orbitSpeed: 0.0015, rotationSpeed: 0.0017, eccentricity: 0.205 },
      { name: 'Venus', radius: 0.9, distance: 7, color: 0xFFA500, orbitSpeed: 0.0012, rotationSpeed: 0.0004, eccentricity: 0.007 },
      { name: 'Earth', radius: 1, distance: 10, color: 0x0000FF, orbitSpeed: 0.001, rotationSpeed: 0.0017, eccentricity: 0.017 },
      { name: 'Mars', radius: 0.6, distance: 15, color: 0xFF0000, orbitSpeed: 0.00053, rotationSpeed: 0.0025, eccentricity: 0.093 },
      { name: 'Jupiter', radius: 2, distance: 25, color: 0xFFA500, orbitSpeed: 0.00008, rotationSpeed: 0.0045, eccentricity: 0.049 },
      { name: 'Saturn', radius: 1.8, distance: 35, color: 0xFFD700, orbitSpeed: 0.000034, rotationSpeed: 0.0039, eccentricity: 0.056 },
      { name: 'Uranus', radius: 1.2, distance: 45, color: 0x00FFFF, orbitSpeed: 0.000012, rotationSpeed: 0.0030, eccentricity: 0.046 },
      { name: 'Neptune', radius: 1.1, distance: 55, color: 0x0000FF, orbitSpeed: 0.000006, rotationSpeed: 0.0028, eccentricity: 0.010 },
    ];

    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const planetMeshes = planets.map(planet => {
      const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: planet.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.name = planet.name;
      scene.add(mesh);

      const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.1, planet.distance + 0.1, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, opacity: 0.2, transparent: true });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      // Create label for planet
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = '24px Arial';
      context.fillStyle = 'white';
      context.fillText(planet.name, 0, 24);
      const texture = new THREE.CanvasTexture(canvas);
      const labelMaterial = new THREE.SpriteMaterial({ map: texture });
      const label = new THREE.Sprite(labelMaterial);
      label.position.set(planet.distance + planet.radius + 1, planet.radius + 1, 0); // Initial label position
      label.scale.set(5, 2.5, 1); // Adjust size of the label
      scene.add(label); // Add the label to the scene

      return { mesh, label, angle: 0 };
    });
    planetMeshesRef.current = planetMeshes;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(planetMeshes.map(p => p.mesh));

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        const planetData = planets.find(p => p.name === clickedPlanet.userData.name);

        if (planetData) {
          setSelectedPlanet(planetData);
          setShowPlanetInfo(true);

          const planetPosition = clickedPlanet.position.clone();
          const cameraOffset = new THREE.Vector3(0, 0, planetData.radius * 5);
          const finalCameraPosition = planetPosition.add(cameraOffset);

          new TWEEN.Tween(camera.position)
            .to(finalCameraPosition, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();

          new TWEEN.Tween(controls.target)
            .to(clickedPlanet.position, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();

          new TWEEN.Tween(clickedPlanet.scale)
            .to({ x: 2, y: 2, z: 2 }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        }
      }
    };

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes.map(p => p.mesh));

      if (intersects.length > 0) {
        const hoveredPlanet = intersects[0].object;
        const planetData = planets.find(p => p.name === hoveredPlanet.userData.name);
        setHoveredPlanet(planetData);
      } else {
        setHoveredPlanet(null);
      }
    };

    const onMouseWheel = (event) => {
      const zoomAmount = event.deltaY * 0.001; // Adjust zoom speed here
      if (camera.position.z + zoomAmount < 100) { // Prevent zooming in too close
        camera.position.z += zoomAmount;
        controls.update();
      }
    };

    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const points = new THREE.Points(starsGeometry, starsMaterial); // Renamed to points
    scene.add(points);

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.0001;

      planetMeshes.forEach((planet, index) => {
        const speed = planets[index].orbitSpeed;
        planet.angle += speed; // Update angle based on orbit speed

        // Calculate elliptical orbit position using eccentricity
        const eccentricity = planets[index].eccentricity;
        const semiMajorAxis = planets[index].distance;
        const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity);

        // Update planet position
        planet.mesh.position.x = Math.cos(planet.angle) * semiMajorAxis;
        planet.mesh.position.z = Math.sin(planet.angle) * semiMinorAxis;

        // Update label position to follow the planet
        planet.label.position.set(
          planet.mesh.position.x + (planets[index].radius + 1), // Offset position of label
          planet.mesh.position.y + (planets[index].radius + 1), // Slightly above the planet
          planet.mesh.position.z
        );

        // Make sure the label's texture is updated in case of text change
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '24px Arial';
        context.fillStyle = 'white';
        context.fillText(planets[index].name, 0, 24);
        planet.label.material.map = new THREE.CanvasTexture(canvas);
        planet.label.material.map.needsUpdate = true; // Update the texture
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
    window.addEventListener('click', onMouseClick);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onMouseWheel);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onMouseWheel);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [selectedPlanet]); // Dependency on selectedPlanet for cleanup

  return (
    <div>
      <div ref={mountRef} />
      {showPlanetInfo && (
        <PlanetInfo planet={selectedPlanet} onClose={handleCloseInfo} />
      )}
      {hoveredPlanet && !showPlanetInfo && (
        <PlanetInfo planet={hoveredPlanet} onClose={() => setHoveredPlanet(null)} />
      )}
    </div>
  );
};

export default SolarSystem;

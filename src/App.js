import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [showLabels, setShowLabels] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
    camera.position.z = 50;

    // Planet data
    const planets = [
      { name: 'Mercury', radius: 0.5, distance: 5, color: 0xC0C0C0 },
      { name: 'Venus', radius: 0.9, distance: 7, color: 0xFFA500 },
      { name: 'Earth', radius: 1, distance: 10, color: 0x0000FF },
      { name: 'Mars', radius: 0.6, distance: 15, color: 0xFF0000 },
      { name: 'Jupiter', radius: 2, distance: 25, color: 0xFFA500 },
      { name: 'Saturn', radius: 1.8, distance: 35, color: 0xFFD700 },
      { name: 'Uranus', radius: 1.2, distance: 45, color: 0x00FFFF },
      { name: 'Neptune', radius: 1.1, distance: 55, color: 0x0000FF },
    ];

    // Create sun
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create planets
    const planetMeshes = planets.map(planet => {
      const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: planet.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = planet.distance;
      mesh.userData = { name: planet.name }; // Store planet name for raycasting
      scene.add(mesh);

      // Create orbit
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

      return { mesh, label };
    });

    // Raycaster for planet selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(planetMeshes.map(p => p.mesh));

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        setSelectedPlanet(clickedPlanet.userData.name);

        // Move camera to focus on the clicked planet
        const planetPosition = clickedPlanet.position.clone();
        const cameraOffset = new THREE.Vector3(0, 0, 5); // Offset to position camera in front of planet
        const finalCameraPosition = planetPosition.add(cameraOffset);

        // Animate camera movement
        new TWEEN.Tween(camera.position)
          .to(finalCameraPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();

        // Point camera at planet
        new TWEEN.Tween(controls.target)
          .to(clickedPlanet.position, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      }
    };

    window.addEventListener('click', onMouseClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      planetMeshes.forEach((planet, index) => {
        const angle = Date.now() * 0.001 * (1 / planets[index].distance);
        planet.mesh.position.x = Math.cos(angle) * planets[index].distance;
        planet.mesh.position.z = Math.sin(angle) * planets[index].distance;
        planet.mesh.rotation.y += 0.01;
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onMouseClick);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [showLabels]);

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
      {selectedPlanet && (
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', background: 'rgba(0,0,0,0.5)', padding: '10px' }}>
          Selected Planet: {selectedPlanet}
        </div>
      )}
    </div>
  );
};
 
export default SolarSystem;
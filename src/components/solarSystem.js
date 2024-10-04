import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [showLabels, setShowLabels] = useState(false);

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
      { name: 'Mercury', radius: 0.5, distance: 5, color: 0xC0C0C0, rotationSpeed: 0.01 },
      { name: 'Venus', radius: 0.9, distance: 7, color: 0xFFA500, rotationSpeed: 0.005 },
      { name: 'Earth', radius: 1, distance: 10, color: 0x0000FF, rotationSpeed: 0.01 },
      { name: 'Mars', radius: 0.6, distance: 15, color: 0xFF0000, rotationSpeed: 0.009 },
      { name: 'Jupiter', radius: 2, distance: 25, color: 0xFFA500, rotationSpeed: 0.004 },
      { name: 'Saturn', radius: 1.8, distance: 35, color: 0xFFD700, rotationSpeed: 0.0038 },
      { name: 'Uranus', radius: 1.2, distance: 45, color: 0x00FFFF, rotationSpeed: 0.003 },
      { name: 'Neptune', radius: 1.1, distance: 55, color: 0x0000FF, rotationSpeed: 0.0028 },
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
    
    // Add comet
    const cometGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const cometMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const comet = new THREE.Mesh(cometGeometry, cometMaterial);
    scene.add(comet);
    
    // Add comet tail
    const cometTailGeometry = new THREE.BufferGeometry();
    const cometTailMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.05,
      transparent: true,
      opacity: 0.4
    });
    const cometTailPoints = new Float32Array(300 * 3);
    const cometTail = new THREE.Points(cometTailGeometry, cometTailMaterial);
    scene.add(cometTail);
    
    // Add stars
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
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
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
    
      // Animate comet
      const time = Date.now() * 0.001;
      const cometOrbitRadius = 70;
      const cometSpeed = 0.2;
      comet.position.x = Math.cos(time * cometSpeed) * cometOrbitRadius;
      comet.position.z = Math.sin(time * cometSpeed) * cometOrbitRadius;
      comet.position.y = Math.sin(time * cometSpeed * 2) * 20;
    
      // Update comet tail
      for (let i = 0; i < 300; i++) {
        const t = i / 300;
        const pos = comet.position.clone().sub(
          new THREE.Vector3(
            Math.cos((time - t * 2) * cometSpeed) * cometOrbitRadius,
            Math.sin((time - t * 2) * cometSpeed * 2) * 20,
            Math.sin((time - t * 2) * cometSpeed) * cometOrbitRadius
          )
        ).multiplyScalar
      }
    
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
    </div>
  );
};

export default SolarSystem;
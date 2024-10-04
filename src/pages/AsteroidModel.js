// src/components/AsteroidModel.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const AsteroidModel = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <Canvas style={{ height: '300px', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive object={gltf.scene} />
    </Canvas>
  );
};

export default AsteroidModel;

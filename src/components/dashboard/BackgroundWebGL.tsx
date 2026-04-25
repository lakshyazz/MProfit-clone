'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5} position={[0, 0, -2]}>
      <MeshDistortMaterial 
        color="var(--color-emerald-bright)" 
        attach="material" 
        distort={0.4} 
        speed={1.5} 
        roughness={0.5} 
        metalness={0.8}
        opacity={0.05}
        transparent
      />
    </Sphere>
  );
};

export default function BackgroundWebGL() {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      opacity: 0.5
    }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedBlob />
      </Canvas>
    </div>
  );
}

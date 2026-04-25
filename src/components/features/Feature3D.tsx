'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Text, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface Feature3DProps {
  type: 'portfolio' | 'import' | 'tax' | 'live' | 'analytics' | 'fo' | 'client';
  reverse?: boolean;
}

// ─── Utility Components ───

// A premium glass layer to act as UI backing
const GlassPlate = ({ position, scale = [3.5, 0.1, 2.5], color = "#ffffff", opacity = 0.3 }: any) => (
  <mesh position={position}>
    <boxGeometry args={scale} />
    <meshPhysicalMaterial 
      color={color} 
      transmission={0.9} 
      opacity={opacity} 
      transparent 
      roughness={0.1} 
      ior={1.5} 
      thickness={0.5} 
    />
    <Edges scale={1} threshold={15} color={color} opacity={0.5} transparent />
  </mesh>
);

// ─── Scenes ───

const PortfolioScene = ({ hover }: { hover: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, hover ? -0.15 : 0, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, hover ? 0.15 : 0, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, hover ? 0.2 : 0, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      <GlassPlate position={[0, -0.2, 0]} color="#10B981" opacity={0.2} />
      
      {/* Bars */}
      {[
        { x: -0.8, h: 0.6, c: "#3B82F6" },
        { x: -0.3, h: 1.2, c: "#10B981" },
        { x: 0.2, h: 0.9, c: "#F59E0B" },
        { x: 0.7, h: 1.5, c: "#8B5CF6" }
      ].map((bar, i) => {
        const BarObj = () => {
          const barRef = useRef<THREE.Mesh>(null);
          useFrame(() => {
            if (barRef.current) {
              const targetH = hover ? bar.h * 1.5 : bar.h;
              barRef.current.scale.y = THREE.MathUtils.lerp(barRef.current.scale.y, targetH, 0.1);
              barRef.current.position.y = barRef.current.scale.y / 2 - 0.1;
            }
          });
          return (
            <mesh ref={barRef} position={[bar.x, bar.h/2 - 0.1, 0.5]}>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshStandardMaterial color={bar.c} roughness={0.2} metalness={0.5} />
            </mesh>
          );
        };
        return <BarObj key={i} />;
      })}

      {/* Floating Donut */}
      <group position={[0, 0.5, -0.5]}>
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.6, 0.15, 16, 64]} />
          <meshPhysicalMaterial color="#EC4899" transmission={0.5} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

const ImportScene = ({ hover }: { hover: boolean }) => {
  const packetsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (packetsRef.current) {
      packetsRef.current.children.forEach((child, i) => {
        // Move packets from left to right
        const t = state.clock.elapsedTime * (hover ? 2 : 0.5) + i;
        child.position.x = (t % 3) - 1.5;
        // Make them arc
        child.position.y = Math.sin((child.position.x + 1.5) * Math.PI / 3) * 0.5 + 0.2;
        child.visible = child.position.x > -1.4 && child.position.x < 1.4;
      });
    }
  });

  return (
    <group>
      {/* Source Server */}
      <mesh position={[-1.5, 0.4, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Packets */}
      <group ref={packetsRef}>
        {[1, 2, 3].map(i => (
          <mesh key={i} position={[-1.5, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        ))}
      </group>

      {/* Destination Folder/Dashboard */}
      <GlassPlate position={[1.5, 0, 0]} scale={[1.2, 0.1, 1.2]} color="#10B981" />
      <mesh position={[1.5, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshPhysicalMaterial color="#10B981" transmission={0.8} opacity={0.5} transparent />
      </mesh>
    </group>
  );
};

const TaxScene = ({ hover }: { hover: boolean }) => {
  const docRef = useRef<THREE.Group>(null);
  const stampRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (docRef.current && stampRef.current) {
      docRef.current.position.y = THREE.MathUtils.lerp(docRef.current.position.y, hover ? 0.2 : 0, 0.1);
      
      // Stamp comes down
      const stampY = hover ? 0.5 : 2;
      stampRef.current.position.y = THREE.MathUtils.lerp(stampRef.current.position.y, stampY, 0.15);
      stampRef.current.rotation.z = THREE.MathUtils.lerp(stampRef.current.rotation.z, hover ? -0.2 : 0, 0.1);
      
      const mat = stampRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, hover ? 1 : 0, 0.1);
    }
  });

  return (
    <group>
      <group ref={docRef}>
        <GlassPlate position={[0, 0, 0]} scale={[2.2, 0.05, 3]} color="#F3F4F6" opacity={0.8} />
        {/* Text lines */}
        {[
          { z: -1, w: 1.5, c: "#9CA3AF" },
          { z: -0.6, w: 1.8, c: "#9CA3AF" },
          { z: -0.2, w: 1.2, c: "#10B981" }, // Positive gain
          { z: 0.2, w: 1.6, c: "#EF4444" },  // Negative tax
          { z: 0.6, w: 1.0, c: "#9CA3AF" },
        ].map((line, i) => (
          <mesh key={i} position={[-0.8 + line.w/2, 0.05, line.z]}>
            <boxGeometry args={[line.w, 0.02, 0.15]} />
            <meshBasicMaterial color={line.c} />
          </mesh>
        ))}
      </group>
      
      {/* The Stamp (e.g. "ITR READY") */}
      <mesh ref={stampRef} position={[0.5, 2, 0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.2} transparent />
      </mesh>
    </group>
  );
};

const LiveScene = ({ hover }: { hover: boolean }) => {
  const dotRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (dotRef.current && glowRef.current) {
      const t = state.clock.elapsedTime * (hover ? 3 : 1);
      // Simulate live chart movement
      dotRef.current.position.x = Math.sin(t * 0.5) * 1.5;
      dotRef.current.position.y = Math.sin(t * 2) * 0.3 + Math.cos(t * 1.5) * 0.2 + 0.6;
      
      glowRef.current.position.copy(dotRef.current.position);
      glowRef.current.scale.setScalar(1 + Math.sin(t * 5) * 0.2);
    }
  });

  return (
    <group>
      <GlassPlate position={[0, 0, 0]} scale={[3.5, 0.05, 2]} color="#111827" opacity={0.9} />
      
      {/* Grid lines */}
      {[-0.5, 0, 0.5].map(z => (
        <mesh key={z} position={[0, 0.05, z]}>
          <boxGeometry args={[3, 0.01, 0.01]} />
          <meshBasicMaterial color="#374151" />
        </mesh>
      ))}

      <mesh ref={dotRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
      
      <mesh ref={glowRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const AnalyticsScene = ({ hover }: { hover: boolean }) => {
  const slicesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (slicesRef.current) {
      slicesRef.current.rotation.y += 0.005;
      slicesRef.current.children.forEach((child: any, i) => {
        // Expand slices out from center on hover
        const targetDist = hover ? 0.2 : 0;
        const angle = child.userData.angle;
        child.position.x = THREE.MathUtils.lerp(child.position.x, Math.cos(angle) * targetDist, 0.1);
        child.position.z = THREE.MathUtils.lerp(child.position.z, Math.sin(angle) * targetDist, 0.1);
        child.position.y = THREE.MathUtils.lerp(child.position.y, hover ? i * 0.1 : 0, 0.1);
      });
    }
  });

  const slices = [
    { color: "#10B981", angle: 0, length: Math.PI },
    { color: "#3B82F6", angle: Math.PI, length: Math.PI / 2 },
    { color: "#F59E0B", angle: Math.PI * 1.5, length: Math.PI / 2 },
  ];

  return (
    <group>
      <GlassPlate position={[0, -0.4, 0]} color="#F3F4F6" opacity={0.5} />
      
      <group ref={slicesRef} position={[0, 0.2, 0]}>
        {slices.map((slice, i) => (
          <mesh key={i} userData={{ angle: slice.angle + slice.length / 2 }}>
            <cylinderGeometry args={[1, 1, 0.2, 32, 1, false, slice.angle, slice.length]} />
            <meshStandardMaterial color={slice.color} roughness={0.1} metalness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const ClientScene = ({ hover }: { hover: boolean }) => {
  const shieldRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y += hover ? 0.05 : 0.01;
      shieldRef.current.position.y = THREE.MathUtils.lerp(shieldRef.current.position.y, hover ? 0.8 : 0.5, 0.1);
      shieldRef.current.scale.setScalar(THREE.MathUtils.lerp(shieldRef.current.scale.x, hover ? 1.2 : 1, 0.1));
    }
  });

  return (
    <group>
      {/* Tablet Body */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2.5, 3.5, 0.1]} />
        <meshStandardMaterial color="#1F2937" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.3, 3.3]} />
        <meshBasicMaterial color="#10B981" transparent opacity={hover ? 0.2 : 0.05} />
      </mesh>

      {/* Floating Shield/Lock indicator */}
      <mesh ref={shieldRef} position={[0, 0.5, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default function Feature3D({ type, reverse = false }: Feature3DProps) {
  const [hovered, setHover] = useState(false);

  const Scene = () => {
    switch (type) {
      case 'portfolio': return <PortfolioScene hover={hovered} />;
      case 'import': return <ImportScene hover={hovered} />;
      case 'tax': return <TaxScene hover={hovered} />;
      case 'live': return <LiveScene hover={hovered} />;
      case 'analytics': return <AnalyticsScene hover={hovered} />;
      case 'fo': return <PortfolioScene hover={hovered} />; // Reuse portfolio for F&O for now
      case 'client': return <ClientScene hover={hovered} />;
      default: return <PortfolioScene hover={hovered} />;
    }
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        cursor: 'pointer',
        touchAction: 'none',
        minHeight: '400px'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Canvas shadows camera={{ position: [5, 4, 5], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#60A5FA" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
          <group rotation={[0, reverse ? Math.PI / 4 : -Math.PI / 4, 0]}>
             <Scene />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}

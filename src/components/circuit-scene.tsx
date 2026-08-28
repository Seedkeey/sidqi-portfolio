"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

const traces: [number, number, number][][] = [
  [[-2.95, 1.55, 0.02], [-2.2, 1.55, 0.02], [-1.75, 1.12, 0.02], [-0.65, 1.12, 0.02]],
  [[-2.7, 0.65, 0.02], [-1.85, 0.65, 0.02], [-1.4, 0.2, 0.02], [-0.5, 0.2, 0.02]],
  [[-2.75, -1.25, 0.02], [-1.65, -1.25, 0.02], [-1.15, -0.75, 0.02], [0.35, -0.75, 0.02], [0.85, -1.25, 0.02], [2.85, -1.25, 0.02]],
  [[-2.15, 1.95, 0.02], [-2.15, 0.05, 0.02], [-1.55, -0.55, 0.02], [-1.55, -1.8, 0.02]],
  [[0.5, 1.35, 0.02], [1.25, 1.35, 0.02], [1.65, 0.95, 0.02], [2.75, 0.95, 0.02]],
  [[0.65, 0.35, 0.02], [1.3, 0.35, 0.02], [1.75, -0.1, 0.02], [2.85, -0.1, 0.02]],
  [[0.15, -0.05, 0.02], [0.15, -0.5, 0.02], [0.65, -1, 0.02]],
];

const vias = [
  [-2.95, 1.55], [-2.7, 0.65], [-2.75, -1.25], [-2.15, 1.95],
  [-1.55, -1.8], [2.75, 0.95], [2.85, -0.1], [2.85, -1.25],
] as const;

const passives = [
  [-2.15, 1.1, 0.42, 0.16, "#d8d1c5"], [-1.25, 1.55, 0.32, 0.18, "#8f1426"],
  [-2.3, -0.45, 0.42, 0.16, "#d8d1c5"], [-0.95, -1.3, 0.34, 0.18, "#8f1426"],
  [1.35, 1.35, 0.42, 0.16, "#d8d1c5"], [2.15, 0.35, 0.34, 0.18, "#8f1426"],
  [1.2, -0.65, 0.42, 0.16, "#d8d1c5"], [2.15, -1.25, 0.34, 0.18, "#8f1426"],
] as const;

function Chip({ position, size = [1.35, 0.8] }: { position: [number, number, number]; size?: [number, number] }) {
  const pinCount = 6;

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[size[0], size[1], 0.22]} />
        <meshStandardMaterial color="#070707" roughness={0.34} metalness={0.68} />
      </mesh>
      {Array.from({ length: pinCount }, (_, index) => {
        const pinX = -size[0] / 2 + 0.14 + index * ((size[0] - 0.28) / (pinCount - 1));
        return [-1, 1].map((side) => (
          <mesh key={`${index}-${side}`} position={[pinX, side * (size[1] / 2 + 0.1), -0.02]}>
            <boxGeometry args={[0.08, 0.22, 0.07]} />
            <meshStandardMaterial color="#b9b5ad" metalness={0.9} roughness={0.25} />
          </mesh>
        ));
      })}
      <mesh position={[-size[0] / 2 + 0.14, size[1] / 2 - 0.14, 0.12]}>
        <cylinderGeometry args={[0.045, 0.045, 0.018, 16]} />
        <meshStandardMaterial color="#8f1426" emissive="#8f1426" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Board() {
  const group = useRef<Group>(null);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * delta * 2;
    group.current.rotation.x += (-pointer.y * 0.1 - group.current.rotation.x) * delta * 2;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.22}>
      <group ref={group} rotation={[-0.08, -0.12, -0.05]}>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[6.6, 4.5, 0.14]} />
          <meshStandardMaterial color="#1b1b1b" roughness={0.72} metalness={0.3} />
        </mesh>
        {traces.map((points, index) => (
          <Line key={index} points={points} color="#c21f3a" lineWidth={2.2} />
        ))}
        {vias.map(([x, y], index) => (
          <group key={index} position={[x, y, 0.04]}>
            <mesh>
              <cylinderGeometry args={[0.095, 0.095, 0.055, 20]} />
              <meshStandardMaterial color="#d8d1c5" metalness={0.85} roughness={0.22} />
            </mesh>
            <mesh position={[0, 0, 0.032]}>
              <cylinderGeometry args={[0.038, 0.038, 0.012, 16]} />
              <meshStandardMaterial color="#171717" />
            </mesh>
          </group>
        ))}
        {passives.map(([x, y, width, height, color], index) => (
          <group key={index} position={[x, y, 0.1]}>
            <mesh>
              <boxGeometry args={[width, height, 0.13]} />
              <meshStandardMaterial color={color} roughness={0.48} metalness={0.28} />
            </mesh>
            {[-1, 1].map((side) => (
              <mesh key={side} position={[side * (width / 2 + 0.055), 0, -0.015]}>
                <boxGeometry args={[0.11, height * 0.82, 0.08]} />
                <meshStandardMaterial color="#c7c2ba" metalness={0.92} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}
        <Chip position={[-0.05, 0.82, 0.14]} />
        <Chip position={[1.9, -0.65, 0.14]} size={[0.9, 0.58]} />
        <group position={[-2.75, -0.2, 0.12]}>
          {Array.from({ length: 5 }, (_, index) => (
            <mesh key={index} position={[index * 0.24, 0, 0]}>
              <boxGeometry args={[0.15, 0.42, 0.2]} />
              <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.4} />
            </mesh>
          ))}
        </group>
        {[
          [-2.95, -1.9], [2.95, -1.9], [-2.95, 1.9], [2.95, 1.9],
        ].map(([x, y], index) => (
          <mesh key={index} position={[x, y, 0.01]}>
            <cylinderGeometry args={[0.16, 0.16, 0.05, 24]} />
            <meshStandardMaterial color="#090909" metalness={0.7} roughness={0.35} />
          </mesh>
        ))}
        <Line points={[[-3, 1.75, 0.02], [-2.55, 1.75, 0.02]]} color="#77736d" lineWidth={1} />
        <Line points={[[2.25, -1.72, 0.02], [2.85, -1.72, 0.02]]} color="#77736d" lineWidth={1} />
      </group>
    </Float>
  );
}

export function CircuitScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        fallback={<div className="circuit-fallback" />}
      >
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 4, 6]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-3, -2, 4]} intensity={7} color="#8f1426" />
        <Board />
      </Canvas>
    </div>
  );
}

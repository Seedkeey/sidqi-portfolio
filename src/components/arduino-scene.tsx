"use client";

import { Canvas } from "@react-three/fiber";
import { Center, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useState } from "react";
import { Box3, Vector3 } from "three";

const modelPath = "/models/arduino_uno.glb";

function ArduinoBoard() {
  const { scene } = useGLTF(modelPath);
  const model = useMemo(() => scene.clone(true), [scene]);
  const scale = useMemo(() => {
    const size = new Box3().setFromObject(model).getSize(new Vector3());
    return 5.8 / Math.max(size.x, size.y, size.z);
  }, [model]);

  return (
    <Float speed={1.05} rotationIntensity={0.04} floatIntensity={0.2}>
      <group rotation={[-0.18, -0.2, -0.06]}>
        <Center>
          <primitive object={model} scale={scale} />
        </Center>
      </group>
    </Float>
  );
}

useGLTF.preload(modelPath);

export function ArduinoScene() {
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className="arduino-canvas"
      data-dragging={dragging}
      aria-label="Interactive 3D Arduino Uno model. Drag to rotate."
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <Canvas
        camera={{ position: [0, 0.35, 7.5], fov: 42 }}
        dpr={[1, 1.5]}
        fallback={<div className="circuit-fallback" />}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 6]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[-4, 1, 3]} intensity={1.1} color="#c21f3a" />
        <Suspense fallback={null}>
          <ArduinoBoard />
          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.75}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

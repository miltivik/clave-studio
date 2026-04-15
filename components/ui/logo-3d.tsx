'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Center, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

interface Logo3DProps {
  url?: string;
  className?: string;
}

function SvgShape({ shape, color }: { shape: THREE.Shape; color: THREE.Color }) {
  // Configuración de la extrusión para darle volumen a las líneas 2D
  const extrudeSettings = useMemo(
    () => ({
      depth: 5, // Qué tan grueso será el volumen
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.5,
      bevelSegments: 3,
      curveSegments: 12,
    }),
    []
  );

  return (
    <mesh castShadow receiveShadow>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial 
        color={color} 
        metalness={1} 
        roughness={0.15} 
        envMapIntensity={2} 
      />
    </mesh>
  );
}

function SvgModel({ url = '/logo-3d.svg' }: { url?: string }) {
  const svg = useLoader(SVGLoader, url);
  const groupRef = useRef<THREE.Group>(null);

  const timeRef = useRef(0);

  // Animación de rotación continua pura sobre su propio centro
  useFrame((state, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5; // Girar lentamente sobre el eje Y
    }
  });

  const shapes = useMemo(() => {
    return svg.paths.map((path) => ({
      shapeList: path.toShapes(true),
      color: path.color,
      userData: path.userData,
    }));
  }, [svg]);

  return (
    <group ref={groupRef}>
      {shapes.map((pathObj, index) =>
        pathObj.shapeList.map((shape, shapeIndex) => (
          <SvgShape
            key={`${index}-${shapeIndex}`}
            shape={shape}
            color={pathObj.color}
          />
        ))
      )}
    </group>
  );
}

export function Logo3D({ url = '/logo-3d.svg', className = '' }: Logo3DProps) {
  return (
    <div className={`relative h-[320px] w-full -translate-y-5 scale-90 transform-gpu pointer-events-none sm:h-[420px] sm:translate-y-0 sm:scale-100 lg:h-[500px] ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 200], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'auto' }} // we need auto here so orbit controls work, but container is pointer-events-none to prevent large box blocking
      >
        {/* Iluminación base para resaltar el oro */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 20]} intensity={1.5} />
        <pointLight position={[-10, -10, 10]} intensity={1} color="#ffddaa" />
        
        {/* Entorno HDRI para reflejos metálicos realistas */}
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
          <Center>
            {/* Se centra el modelo SVG, pero como lo generamos en coordenadas de SVG (y va hacia abajo), 
                Centro invierte y ajusta automáticamente. Scalamos para ajustar a cámara. */}
            <group scale={[0.5, -0.5, 0.5]}>
              <SvgModel url={url} />
            </group>
          </Center>
        </Suspense>
        
        {/* Controles para poder mover la cámara (opcional) */}
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

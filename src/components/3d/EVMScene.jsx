import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Float, Text } from '@react-three/drei';
import { Suspense } from 'react';

function EVMModel() {
  return (
    <group>
      {/* Control Unit */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1.5, 0.6, 2]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.1} metalness={0.5} />
      </mesh>
      <mesh position={[-1.5, 0.35, -0.4]}>
        <boxGeometry args={[1, 0.1, 0.8]} />
        <meshStandardMaterial color="#1a252f" emissive="#00ff00" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Ballot Unit */}
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[2.5, 0.5, 4]} />
        <meshStandardMaterial color="#ecf0f1" roughness={0.3} />
      </mesh>
      
      {/* Buttons */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[1.4, 0.3, -1.5 + (i * 0.45)]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshStandardMaterial color="#e74c3c" />
        </mesh>
      ))}
      
      {/* Labels */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0.2, 0.26, -1.5 + (i * 0.45)]}>
          <boxGeometry args={[1.5, 0.01, 0.3]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}

      {/* Screen */}
      <Text
        position={[-1.5, 0.42, -0.4]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.1}
        color="#00ff00"
        font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
      >
        ECI READY
      </Text>
    </group>
  );
}

export function EVMScene() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl overflow-hidden shadow-2xl relative border border-white/5">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-white text-xl font-bold tracking-tight">Interactive EVM Model</h3>
        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">3D Visualization Mode</p>
      </div>
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 8]} fov={40} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <EVMModel />
            </Float>
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white/30 text-[10px] font-medium uppercase tracking-tighter">
        <span>Control Unit (CU)</span>
        <span>Ballot Unit (BU)</span>
        <span>VVPAT Ready</span>
      </div>
    </div>
  );
}

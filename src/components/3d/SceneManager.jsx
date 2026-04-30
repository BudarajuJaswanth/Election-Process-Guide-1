// SceneManager.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text, Html } from '@react-three/drei';
import { useLanguage } from '../../context/LanguageContext';

function BallotBox() {
  const boxRef = useRef();
  const { lang } = useLanguage();
  
  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const label = lang === 'hi' ? 'सुरक्षित मतपेटी' : 'Secure Ballot Box';

  return (
    <group ref={boxRef}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.05, 3.05, 2.05]} />
        <meshStandardMaterial color="#112E51" wireframe />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.4]} />
        <meshStandardMaterial color="#005EA2" />
      </mesh>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[1.2, 0.05, 1.8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </Float>
      <Html position={[0, -2, 0]} center>
        <div className="bg-white px-3 py-1.5 rounded-full border border-gov-light-gray text-xs font-bold text-gov-navy shadow-sm whitespace-nowrap">
          {label}
        </div>
      </Html>
    </group>
  );
}

function VoteCounter() {
  const { lang } = useLanguage();
  const label = lang === 'hi' ? 'मतगणना...' : 'Counting...';
  return (
    <group>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
        <mesh>
          <torusGeometry args={[1.5, 0.4, 16, 100]} />
          <meshStandardMaterial color="#005EA2" wireframe />
        </mesh>
      </Float>
      <Text position={[0, 0, 0]} fontSize={0.5} color="#112E51" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

export function SceneManager({ sceneConfig }) {
  if (!sceneConfig) return null;
  const { scene, camera, annotation } = sceneConfig;

  return (
    <div className="w-full h-full relative min-h-[400px] rounded-2xl overflow-hidden bg-gov-bg border border-gov-light-gray shadow-inner">
      <Canvas camera={{ position: camera === 'top' ? [0, 5, 0] : [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        {scene === 'ballot_box' && <BallotBox />}
        {scene === 'vote_counter' && <VoteCounter />}
        <OrbitControls enableZoom={false} autoRotate={camera === 'orbit'} />
        <Environment preset="neutral" />
      </Canvas>
      {annotation && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max max-w-[90%] pointer-events-none">
          <div className="bg-gov-navy/90 backdrop-blur-md text-white px-5 py-2 rounded-full border border-white/20 text-xs font-bold shadow-lg">
            {annotation}
          </div>
        </div>
      )}
    </div>
  );
}

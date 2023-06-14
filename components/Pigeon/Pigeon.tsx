import { useRef } from "react";
import { Mesh } from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const gltf = useLoader(GLTFLoader, "./public/assets/pigeon/scene.gltf");

export default function Pigeon() {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0.7, 1, -1]}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

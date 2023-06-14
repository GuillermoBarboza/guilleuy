import { useRef } from "react";
import { Mesh } from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GUI from "lil-gui";

export default function Pigeon() {
  const meshRef = useRef<Mesh>(null);
  const positionValues = { x: 1, y: 1, z: -1 };
  const scaleValues = { scale: 1 };

  const gltf = useLoader(GLTFLoader, "/assets/pigeon/scene.gltf");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const gui = new GUI();

      gui.add(positionValues, "x", -200, 200);
      gui.add(positionValues, "y", -200, 200);
      gui.add(positionValues, "z", -200, 200);
      gui.add(scaleValues, "scale", 0, 10);
    }
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={[positionValues.x, positionValues.y, positionValues.z]}
      scale={scaleValues.scale}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}

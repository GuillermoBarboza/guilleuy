import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useXREvent } from "@react-three/xr";
import { Mesh, Vector3 } from "three";

function Cube(): JSX.Element {
  const meshRef = useRef<Mesh>(null);
  const [position, setPosition] = useState({ x: 1, y: 1, z: -1 });

  const { gl } = useThree();

  useXREvent("connected", () => {
    gl.domElement.style.display = "none";
    console.log("XR session started!");
  });

  useXREvent("disconnected", () => {
    gl.domElement.style.display = "block";
    console.log("XR session ended!");
  });

  useFrame(() => {
    if (meshRef.current) {
      const { rotation } = meshRef.current;
      if (rotation) {
        rotation.x += 0.01;
        rotation.y += 0.01;
      }
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(position.x, position.y, position.z);
    }
  }, [position]);

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function Webxr() {
  return (
    <>
      <Cube />
    </>
  );
}

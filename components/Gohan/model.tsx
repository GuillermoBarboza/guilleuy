import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Mesh, Group, Vector3 } from "three";

interface FBXModelProps {
  position: Vector3;
}

const FBXModel: React.FC<FBXModelProps> = ({ position }) => {
  const fbxRef = useRef<Mesh>(null);
  const fbx = useLoader(FBXLoader, "/assets/gohan.fbx");

  useEffect(() => {
    if (fbxRef.current) {
      fbxRef.current.add(fbx);
      console.log(fbx.animations[0]);
    }
  }, [fbx]);

  return (
    <mesh position={position} ref={fbxRef}>
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export default FBXModel;

import React, { useEffect, useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  useLoader,
  GroupProps,
} from "@react-three/fiber";
import {
  useXREvent,
  XR,
  ARButton,
  XREvent,
  XRManagerEvent,
} from "@react-three/xr";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Mesh, Group, Vector3 } from "three";

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
    import("lil-gui").then(({ default: GUI }) => {
      const gui = new GUI();
      gui.add(position, "x", -10, 10);
      gui.add(position, "y", -10, 10);
      gui.add(position, "z", -10, 10);

      gui.onChange(() => {
        setPosition(position);
      });
    });
  }, []);

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

function FBXModel(): JSX.Element {
  const fbxRef = useRef<Group>(null);
  const fbx = useLoader(FBXLoader, "/assets/gohan.fbx");
  const [position, setPosition] = useState({ x: 1, y: 1, z: -1 });

  useEffect(() => {
    if (fbxRef.current) {
      fbxRef.current.add(fbx);
      console.log(fbx.animations[0]);
    }
  }, [fbx]);

  useEffect(() => {
    import("lil-gui").then(({ default: GUI }) => {
      const gui = new GUI();
      gui.add(position, "x", -10, 10);
      gui.add(position, "y", -10, 10);
      gui.add(position, "z", -10, 10);

      gui.onChange(() => {
        setPosition(position);
      });
    });
  }, []);

  useEffect(() => {
    if (fbxRef.current) {
      fbxRef.current.position.set(position.x, position.y, position.z);
    }
  }, [position]);

  return (
    <group
      position={new Vector3(position.x, position.y, position.z)}
      ref={fbxRef}
    />
  );
}

export default function Webxr() {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR
          foveation={0}
          referenceSpace="local"
          onSessionStart={(event: XREvent<XRManagerEvent>) => {}}
          onSessionEnd={(event: XREvent<XRManagerEvent>) => {}}
        >
          <ambientLight />
          <pointLight position={[1, 1, 1]} />

          {/* <Cube /> */}
          <FBXModel />
        </XR>
      </Canvas>
    </>
  );
}

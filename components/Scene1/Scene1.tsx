import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useXREvent,
  XR,
  ARButton,
  XRButton,
  XREvent,
  XRManagerEvent,
} from "@react-three/xr";
import { Mesh } from "three";
import Cube from "../Cube/Cube";
import Pigeon from "../Pigeon/Pigeon";

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
          <pointLight position={[10, 10, 10]} />
          {/* <Pigeon /> */}
        </XR>
      </Canvas>
    </>
  );
}

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useXR, XR, ARButton, XRButton } from '@react-three/xr';
import { Mesh } from 'three';


function Square(): JSX.Element {
    const meshRef = useRef<Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            const { rotation } = meshRef.current;
            if (rotation) {
                rotation.x += 0.01;
                rotation.y += 0.01;
            }
        }

    });

    return (
        <mesh ref={meshRef}>
            <planeBufferGeometry />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
}

export default function Webxr() {


    return (
        <>
            <ARButton />
            <Canvas >
                <XR
                    /**
                     * Enables foveated rendering. Default is `0`
                     * 0 = no foveation, full resolution
                     * 1 = maximum foveation, the edges render at lower resolution
                     */
                    foveation={0}
                    /** Type of WebXR reference space to use. Default is `local-floor` */
                    referenceSpace="local-floor"
                >
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />

                    <Square />
                </XR>
            </Canvas>
        </>
    )
}

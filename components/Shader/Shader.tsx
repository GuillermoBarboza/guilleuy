import React, { useEffect, useState, useRef } from 'react'
import styles from './Shader.module.css'
import { ShaderMaterial, Scene, OrthographicCamera, WebGLRenderer, Mesh, PlaneGeometry } from 'three';
/* import { getPixelValue } from '../../utils/getPixelValue'; */
import { getPixelsAndApplyFilter, getPixelLocation, getRandomInt } from '../../utils/utils'



export default function Shader() {
    const videoRef = React.createRef<HTMLVideoElement>();
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const stepRef = useRef(0);
    const prevFrame = useRef(null);

    useEffect(() => {
        if (videoRef.current != null) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play()
            });
        }

    }, [videoRef]);

    useEffect(() => {

        const scene = new Scene();
        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new WebGLRenderer({ canvas: canvasRef.current });

        const geometry = new PlaneGeometry(2, 2);

        const uniforms = {
            tDiffuse: { value: null },
            time: { value: 0.0 }
        };

        const material = new ShaderMaterial({
            uniforms,
            vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
            fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float time;
            varying vec2 vUv;
            void main() {
              vec4 color = texture2D(tDiffuse, vUv);
              color.rgb += sin(time + vUv.x * vUv.y) * 0.1;
              gl_FragColor = color;
            }
          `
        });

        const mesh = new Mesh(geometry, material);
        scene.add(mesh);
        gl.  
        const animate = () => {
          
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            material.uniforms.time.value += 0.5;
        /*     setTimeout(() => {
                console.log('he',canvasRef.current, mesh, renderer) 
                debugger  
            }, 3000); */
        };

        animate();
    }, [videoRef, canvasRef]);


    return (
        <div className={styles.wrapper}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
            <video ref={videoRef} className={styles.video}></video>
            <a href="/" className={styles.link}>Back to Space</a>
        </div>
    )
}
import React, { useEffect, useState, useRef } from 'react'
import styles from './Vfx.module.css'

/* import { getPixelsAndApplyFilter, getPixelLocation, getRandomInt } from '../../utils/utils' */

export default function Vfx() {
    const videoRef = React.createRef<HTMLVideoElement>();
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const stepRef = useRef(0);
    const prevFrame = useRef(null);


    useEffect(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d')!;
        let requestId: number;

        // Get user's camera stream and set it as the video source
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play()
            })
            .catch((err) => {
                console.error(`Error accessing camera: ${err}`);
            });

        // Define a filter function to apply to the canvas
        function applyFilter() {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                // Invert colors
                data[i] = 255 - data[i]; // Red
                data[i + 1] = 255 - data[i + 1]; // Green
                data[i + 2] = 255 - data[i + 2]; // Blue
            }

            ctx.putImageData(imageData, 0, 0);
        }

        // Request animation frame to continuously update the canvas
        function render() {
            requestId = requestAnimationFrame(render);

            if (video.readyState >= video.HAVE_CURRENT_DATA) {
                // Draw the video onto the canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Apply filter to the canvas
                applyFilter();
            }
        }
        render();

        // Cleanup function to stop the animation frame and close the video stream
        return () => {
            cancelAnimationFrame(requestId);
            // @ts-ignore
            video.srcObject?.getTracks().forEach((track) => track.stop());
        };
    }, [canvasRef, videoRef]);


    return (
        <div className={styles.wrapper}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
            <video ref={videoRef} className={styles.video}></video>

        </div>
    )
}
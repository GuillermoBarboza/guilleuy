import React, { useEffect, useState, useRef } from 'react'
import styles from './Vfx.module.css'

/* import { getPixelValue } from '../../utils/getPixelValue'; */


export default function Vfx() {
    const videoRef = React.createRef<HTMLVideoElement>();
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const stepRef = useRef(null);
    const prevFrame = useRef(null);

    function getPixelValue(imageData, color): Array<{ x: number; y: number; }> {
        let newPixels: Array<{ x: number; y: number; }> = [];

        for (let index = 0; index < imageData.data.length; index += 4) {
            const newPixel = {
                r: imageData.data[index],
                g: imageData.data[index + 1],
                b: imageData.data[index + 2]
            };
            const pixelIndex = index / 4;

            const pixelLocation = {
                x: pixelIndex % imageData.width,
                y: Math.floor(pixelIndex / imageData.width)
            }

            if (colorMatch(newPixel, color)) {
                newPixels.push(pixelLocation)
            }
        }
        return newPixels;
    }

    function colorMatch(color1, color2, threshold = 60) {
        return (color1.r - color2.r) ** 2 +
            (color1.g - color2.g) ** 2 +
            (color1.b - color2.b) ** 2 < threshold * threshold;
    }

    useEffect(() => {
        const video = document.createElement('video');

        if (video != null && canvasRef != null) {
            navigator.mediaDevices.getUserMedia({ video: true }).then((data) => {
                video.srcObject = data;
                video.play()
                video.onloadeddata = () => {
                    canvasRef.current.width = video.videoWidth;

                    console.log(canvasRef.current?.width, video?.videoWidth)
                    canvasRef.current.height = video.videoHeight;
                    const ctx = canvasRef.current.getContext('2d')

                    const animate = (time: Number) => {
                        ctx?.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height)

                        const imageData = ctx.getImageData(0, 0, canvasRef.current?.width, canvasRef.current?.height)

                        const newPixels: Array<{ x: number, y: number }> = getPixelValue(imageData, { r: 100, g: 255, b: 255 });

                        ctx.fillStyle = "yellow";

                        newPixels.forEach((pixel) => {
                            ctx.fillRect(pixel.x, pixel.y, 1, 1)
                        })

                        stepRef.current = requestAnimationFrame(animate);
                    }
                    stepRef.current = requestAnimationFrame(animate)

                }
            }).catch((error) => { alert(error) })

        }
        return () => {
            if (stepRef.current != null) {
                cancelAnimationFrame(stepRef.current)
            }

            /*  timeline.current?.kill(); */
        }
    }, [canvasRef, videoRef])

    return (
        <div className={styles.wrapper}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
            {/* <video ref={videoRef} className={styles.video}></video> */}
        </div>
    )
}
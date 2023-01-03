import React, { useEffect, useState, useRef } from 'react'
import styles from './Vfx.module.css'

/* import { getPixelValue } from '../../utils/getPixelValue'; */

interface Color { r: number, g: number, b: number }

export default function Vfx() {
    const videoRef = React.createRef<HTMLVideoElement>();
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const stepRef = useRef(0);
    const prevFrame = useRef(null);

    function getPixelLocation(imageData: ImageData, color: { r: number, g: number, b: number }): Array<{ x: number; y: number; }> {
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

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    function getPixelsAndApplyFilter(imageData: ImageData): ImageData {

        for (let index = 0; index < imageData.data.length; index += 4) {

            imageData.data[index] = imageData.data[index] + 32;
            imageData.data[index + 1] = imageData.data[index + 1] - 15;
            imageData.data[index + 2] = imageData.data[index + 2] + 89;

        }
        /*  let pixels: Array<{ r: number; g: number; b: number, x: number, y: number }> = [];
 
         for (let index = 0; index < imageData.data.length; index += 4) {
 
             const pixelIndex = index / 4;
 
             const newPixel = {
                 r: imageData.data[index],
                 g: imageData.data[index + 1],
                 b: imageData.data[index + 2],
                 x: pixelIndex % imageData.width,
                 y: Math.floor(pixelIndex / imageData.width)
             }; 
 
             pixels.push(newPixel)
         }*/

        return imageData;
    }

    function colorMatch(color1: Color, color2: Color, threshold = 160) {
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

                    if (canvasRef.current != null && stepRef.current != null) {
                        canvasRef.current.width = video.videoWidth;
                        canvasRef.current.height = video.videoHeight;
                        const ctx = canvasRef.current.getContext('2d');

                        const animate = (time: Number) => {
                            if (canvasRef.current != null && stepRef.current != null && ctx != null) {

                                ctx?.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height)

                                const imageData = ctx.getImageData(0, 0, canvasRef.current?.width, canvasRef.current?.height)

                                /* const newPixels: Array<{
                                    r: number;
                                    g: number;
                                    b: number;
                                    x: number;
                                    y: number;
                                }> = getPixels(imageData); */

                                const newPixels: ImageData = getPixelsAndApplyFilter(imageData);

                                 ctx.putImageData(newPixels, 0, 0)

                                /*  newPixels.forEach((pixel) => {
                                     
                                     ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
                                     ctx.fillRect(pixel.x, pixel.y, 0.5, 0.5)
                                 }) */


                               /*  if (time > 5000) {
                                    debugger;
                                } */
                                stepRef.current = requestAnimationFrame(animate);
                            }
                        }

                        stepRef.current = requestAnimationFrame(animate)
                    }




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
            <a href="/" className={styles.link}>Back to Space</a>
        </div>
    )
}
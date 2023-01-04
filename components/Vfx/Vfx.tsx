import React, { useEffect, useState, useRef } from 'react'
import styles from './Vfx.module.css'

/* import { getPixelValue } from '../../utils/getPixelValue'; */
import { getPixelsAndApplyFilter, getPixelLocation, getRandomInt } from '../../utils/utils'



export default function Vfx() {
    const videoRef = React.createRef<HTMLVideoElement>();
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const stepRef = useRef(0);
    const prevFrame = useRef(null);



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
                                /* 
                                PARA PARSEAR PIXELES Y ALTERAR RGB VALUES
                                const newPixels: ImageData = getPixelsAndApplyFilter(imageData);
                              
                                ctx.putImageData(newPixels, 0, 0) */


                                const newPixels: Array<{
                                    x: number;
                                    y: number;
                                }> = getPixelLocation(imageData, {
                                    r: 23,
                                    g: 200,
                                    b: 100
                                });
                                
                                newPixels.forEach((pixel) => {
                                    ctx.fillStyle = `rgb(${getRandomInt(225)}, ${getRandomInt(225)}, ${getRandomInt(225)})`;
                                   /*  ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`; */
                                    ctx.fillRect(pixel.x, pixel.y, 1.5, 1.5)
                                })





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
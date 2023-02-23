import React, { useEffect, useState, useRef } from 'react'
import styles from './Vfx.module.css'

/* import { getPixelValue } from '../../utils/getPixelValue'; */
import { getPixelsAndApplyFilter, getPixelLocation, getRandomInt } from '../../utils/utils'

export default function Vfx() {
    const videoRef = React.createRef<HTMLVideoElement>();
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const stepRef = useRef(0);
    const prevFrame = useRef(null);

   /*  useEffect(() => {
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
                                    
                                    ctx.fillRect(pixel.x, pixel.y, 1.5, 1.5)
                                })
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
        }
    }, [canvasRef, videoRef]) */

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
      
        };
      }, [canvasRef, videoRef]);
    

    return (
        <div className={styles.wrapper}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
            <video ref={videoRef} className={styles.video}></video>
           
        </div>
    )
}
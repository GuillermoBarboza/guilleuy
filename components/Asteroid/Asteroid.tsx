import styles from './Asteroid.module.css'
import React, { useEffect, useState, useRef } from 'react'
import asteroid from '../../assets/images/asteroid.png'
import Image from 'next/image'

import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import gsap from 'gsap';


gsap.registerPlugin(MotionPathPlugin);  /* register the MotionPath plugin */

export default function Asteroid() {
    const asteroidRef = useRef(null);
    const requestFrame = useRef(null);
    const prevFrame = useRef(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /*   const animate = (time: Number) => {
        if (prevFrame.current != undefined) {
            const deltaTime = time - prevFrame.current;
            let { x, y } = asteroidRef.current.getBoundingClientRect();

        }
        prevFrame.current = time;
        requestFrame.current = requestAnimationFrame(animate);
    } */

    useEffect(() => {
       /*  requestFrame.current = requestAnimationFrame(animate) */

        gsap.to(asteroidRef.current, {
            motionPath: {
                path: "#pathAsteroid",
                align: "#pathAsteroid",
                alignOrigin: [0.5, 0.5],
                autoRotate: false
            },
            rotateZ: 960,
            duration: 10,
            ease: "none",
            repeat: -1
        });
        console.log(asteroidRef.current)

        return () => {
           /*  cancelAnimationFrame(requestFrame) */
           /*  timeline.current?.kill(); */
        }

    }, [asteroidRef])

    return (
        <>
            <div
                className={styles.asteroidWrapper}
            >
                <svg className={styles.svgAsteroid} width="100%" height="100%" viewBox="0 -300 1300 1300" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <path id="pathAsteroid" className={styles.pathAsteroid} d="
                    M 100, 100
                    m -75, 0
                    a 75,75 0 1,0 150,0
                    a 75,75 0 1,0 -150,0" fill="none" />

                </svg>
                <Image
                    ref={asteroidRef}
                    className={styles.asteroid}
                    src={asteroid}
                    alt={''} />


            </div>
        </>
    )
}
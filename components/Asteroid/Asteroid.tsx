import styles from './Asteroid.module.css'
import React, { useEffect, useState, useRef } from 'react'
import asteroid from '../../assets/images/asteroid.png'
import Image from 'next/image'

import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import gsap from 'gsap';
import { reverse } from 'dns/promises';


gsap.registerPlugin(MotionPathPlugin);  /* register the MotionPath plugin */

export default function Asteroid() {
    const asteroidRef = React.createRef<HTMLImageElement>();
    const alertRef = React.createRef<HTMLDivElement>();
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
                autoRotate: true
            },
            repeatRefresh: true,
            duration: 10,
            ease: "none",
            repeat: -1
        });


        if (asteroidRef.current != null && alertRef.current != null) {
            asteroidRef.current.addEventListener('click', () => {
                if (alertRef.current != null) {
                    gsap.to(document.querySelector('h1'), {
                        translateY: alertRef.current.classList.contains(styles.hidden) ? -100 : 0,
                        duration: 1.2,
                    })
                    alertRef.current.classList.toggle(styles.hidden)
                }

                /* window.location.href =  window.location.href + 'develop' */
            })
        }


        return () => {
            /*  cancelAnimationFrame(requestFrame) */
            /*  timeline.current?.kill(); */
        }

    }, [asteroidRef, alertRef])

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

                <div ref={alertRef} className={[styles.alert, styles.hidden].join(' ')}>
                    <p>Do you wanna see whats in the dak part of this asteroid?</p>
                    <button onClick={(e) => {
                        gsap.to(alertRef.current, {
                            skewX: 90,
                            duration: 2.6,
                            ease: 'power4.out'
                        })
                        setTimeout(() => {
                            window.location.href = window.location.href + 'develop'
                        }, 2500)

                    }}>Yes</button>
                    <div></div>
                </div>
            </div>
        </>
    )
}
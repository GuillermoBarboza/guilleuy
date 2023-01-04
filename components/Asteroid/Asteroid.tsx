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
        console.log(window.innerWidth / 40,window.innerWidth*2) 
        gsap.to(asteroidRef.current, {
            motionPath: {
                path: "#pathAsteroid",
                align: "#pathAsteroid",
                alignOrigin: [0.5, 0.5],
                autoRotate: false
            },
            repeatRefresh: true,
            rotateZ: window.innerWidth*2,
            duration: window.innerWidth / 40,
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
                {/*  <svg className={styles.svgAsteroid} width="100%" height="100%" viewBox="0 -300 1300 1300" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <path  className={styles.pathAsteroid} d="
                    M 100, 100
                    m -75, 0
                    a 75,75 0 1,0 150,0
                    a 75,75 0 1,0 -150,0" fill="none" />

                </svg> */}

                <svg className={styles.svgAsteroid} width="278" height="264" viewBox="0 0 278 264" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles.pathAsteroid} id="pathAsteroid" d="M205.5 107C134 32.9996 68.5 3.5003 16 0.99963C-36.5 -1.50104 65 77.5003 101 167C137 256.499 264.5 269.499 274 260.499C283.5 251.499 277 181 205.5 107Z" />
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
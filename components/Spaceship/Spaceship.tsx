import styles from './Spaceship.module.css'
import React, { useEffect, useState, useRef } from 'react'
import spaceship from '../../assets/images/N6.png'
import Image from 'next/image'

import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import gsap from 'gsap';
import { reverse } from 'dns/promises';
import { transform } from 'typescript';
export default function Spaceship(timeline: React.MutableRefObject<gsap.core.Timeline | null>) {
    const spaceshipRef = useRef(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        gsap.to(spaceshipRef.current, {
            motionPath: {
                path: "#path",
                align: "#path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 10,
            ease: "none",
            repeat: -1,
        })
        gsap.to(spaceshipRef.current, {
            delay: 8.5,
            scale: 0,
            duration: 2,
            ease: 'linear'
        });


       /*  timeline.current.add(effect)  */
    /*     return () => {
            timeline.current?.kill();
        } */

    }, [spaceshipRef])

    return (
        <>
            <div
                className={styles.asteroidWrapper}
            >
                <svg className={styles.svg} width="100%" height="100%" viewBox="0 -300 1300 1300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles.path} id="path" fill="none" strokeWidth="2" d="M20.2 679.7c210.3-19.1 398.9-219.6 236.5-257.5-170.5-16.8-132.5 146.2-6.8 184.7 141.6 55.7 242.3-9.9 215.3-89.3-43.7-94-330-292-85-347.3 135.5-18.7 251 54.7 302.9 141.5 50.2 85 25.5 183.8 136.6 248.6C1000 627 1037.7 427 1039 395.7c20.3-196.6-133.8-218-199.5-170s-11.3 138.5 107 114S1126.7 147.6 1092.6 67c-2.4-12.2-1.4-23.1 9.2-31.8 100.8-49.4 112.2 198.4 239-23.8" />
                </svg>
                <div
                    className={styles.asteroidWrapper}>
                    <Image
                        ref={spaceshipRef}
                        className={styles.spaceship}
                        src={spaceship}
                        alt={''} />
                </div>

            </div>
        </>
    )
}
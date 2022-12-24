import styles from './Header.module.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap';

import Nav from '../Nav/Nav';

export default function Header({ galaxyBkg, asteroid }: { galaxyBkg: React.RefObject<HTMLDivElement> | null, asteroid: React.RefObject<HTMLDivElement> | null  }) {

    const button: React.RefObject<HTMLButtonElement> = useRef(null);
    const root = useRef(null);
    const asteroidTimeline = useRef<gsap.core.Timeline | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const onClick = () => {
        timelineRef.current?.play();
        if (!timelineRef.current?.isActive() && galaxyBkg !== null) {
            timelineRef.current?.to(galaxyBkg.current, {
                filter: `brightness(${genRandom(0.7, 0.8, true)}) hue-rotate(${genRandom(360, 1200)}deg)`,
                duration: 3
            }, 0)
            timelineRef.current?.restart();

        }

    /*     if (!asteroidTimeline.current?.isActive() && asteroid !== null) {
            asteroidTimeline.current?.to(asteroid.current, {
                translateX: "20%",
                translateY: "-30%",
                duration: 3
            }, 0)
            asteroidTimeline.current?.restart();

        } */
    }

    function genRandom(min: number, max: number, nofloor?: boolean) {
        return nofloor ?
            Math.random() * (max - min) + 0.7
            : Math.floor(Math.random() * (max - min));
    }

    useEffect(() => {
        if (galaxyBkg !== null) {
            timelineRef.current = gsap
                .timeline({ paused: true })
                .to(root.current, {
                    rotation: "+=360",
                    duration: 3
                })

        }
 
        if (asteroid !== null) {
            asteroidTimeline.current = gsap
                .timeline({ paused: false })
                .to(asteroid.current, {
                    translateX: "40%",
                    translateY: "-60%",
                    duration: 3
                })

        }

        return () => {
            timelineRef.current?.kill();
        };
    }, [galaxyBkg, asteroid])


    return (
        <>
            <header className={styles.header}>
                <div className={styles.content} >
                    <h1 ref={root} className={styles.h1}>This is a Website</h1>
                    <button ref={button} onClick={() => onClick()}>Clicky Clicky</button>
                </div>
                <Nav />
            </header>
        </>
    )
}
import styles from './Header.module.css'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';


export default function Header() {

    const button: React.RefObject<HTMLButtonElement> = useRef(null);
    const root = useRef(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const onClick = () => {
        timelineRef.current?.play();
        if (!timelineRef.current?.isActive() !== null) {
            timelineRef.current?.restart();
        }
    }

    function genRandom(min: number, max: number, nofloor?: boolean) {
        return nofloor ?
            Math.random() * (max - min) + 0.7
            : Math.floor(Math.random() * (max - min));
    }

    useEffect(() => {
        timelineRef.current = gsap
            .timeline({ paused: true })
            .to(root.current, {
                rotation: "+=360",
                duration: 3
            })

        return () => {
            timelineRef.current?.kill();
        };
    }, [])


    return (
        <>
            <header className={styles.header}>
                <div className={styles.content} >
                    <h1 ref={root} className={styles.h1}>This is a Website</h1>
                    <button ref={button} onClick={() => onClick()}>Clicky Clicky</button>
                </div>
            </header>
        </>
    )
}
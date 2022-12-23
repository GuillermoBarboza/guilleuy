import styles from './Header.module.css'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

import Nav from '../Nav/Nav';
import Background from '../Background/Background';

export default function Header({ galaxyBkg }: { galaxyBkg: React.RefObject<HTMLDivElement> | null }) {

    const button: React.RefObject<HTMLButtonElement> = useRef(null);
    const root = useRef(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const onClick = () => {
        console.log(galaxyBkg)
        timelineRef.current?.play();
        if (!timelineRef.current?.isActive()) {
            timelineRef.current?.restart();
        }
    }
    useEffect(() => {
        if (galaxyBkg !== null) {
            timelineRef.current = gsap
                .timeline({ paused: true })
                .to(root.current, { rotation: "+=360", duration: 3 })
                .to(galaxyBkg.current, { filter: "hue-rotate(870deg)", duration: 3 }, 0)
        }

        return () => {
            timelineRef.current?.kill();
        };
    }, [galaxyBkg])

    return (
        <>
            <header className={styles.header}>
                <div className={styles.content} >
                    <h1 ref={root} className={styles.h1}>This is a Website</h1>
                    <button ref={button} onClick={(e) => onClick()}>Clicky Clicky</button>
                </div>
                <Nav />
            </header>
        </>
    )
}
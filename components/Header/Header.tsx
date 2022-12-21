import styles from './Header.module.css'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Header() {

    const button: React.RefObject<HTMLButtonElement> = useRef(null);
    const root = useRef(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const onClick = (e) => {
        timelineRef.current?.play();
        if(!timelineRef.current?.isActive()){
            timelineRef.current?.restart();
        }
    }
    useEffect(() => {
        timelineRef.current = gsap
            .timeline({ paused: true })
            .to(root.current, { rotation: "+=360", duration: 3});

        return () => {
            timelineRef.current?.kill();
        };
    }, [])

    return (
        <>
            <header className={styles.header}>
                <div className={styles.content} >
                    <h1 ref={root} className={styles.h1}>This is a Website</h1>
                    <button ref={button} onClick={(e) => onClick(e)}>Clicky Clicky</button>
                </div>

                <nav className={styles.nav}><h3>Where do you wanna go?</h3>
                    <ul>
                        <li><button>to the m00n...</button></li>
                        <li><button>I wanna go biking</button></li>
                        <li><button>just a chill trip</button></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
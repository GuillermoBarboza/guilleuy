import styles from './Nav.module.css'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Nav() {

    const openButton: React.RefObject<HTMLButtonElement> = useRef(null);
    const closeButton: React.RefObject<HTMLButtonElement> = useRef(null);
    const moonButton: React.RefObject<HTMLButtonElement> = useRef(null);
    const bikeButton: React.RefObject<HTMLButtonElement> = useRef(null);
    const chillButton: React.RefObject<HTMLButtonElement> = useRef(null);

    const root = useRef(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const onClick = () => {
     /*    timelineRef.current?.play();
        if (!timelineRef.current?.isActive()) {
            timelineRef.current?.restart();
        } */
    }
    useEffect(() => {
    /*     timelineRef.current = gsap
            .timeline({ paused: true })
            .to(root.current, { rotation: "+=360", duration: 3 }); */

        return () => {
           /*  timelineRef.current?.kill(); */
        };
    }, [])

    return (
        <>
            <nav className={styles.nav}><h3>Where do you wanna go?</h3>
                <ul>
                    <li><button>to the m00n...</button></li>
                    <li><button>I wanna go biking</button></li>
                    <li><button>just a chill trip</button></li>
                </ul>
            </nav>
        </>
    )
}
import styles from './Background.module.css'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

/* import PSD from '../../assets/images/Space.psd' */

export default function Background() {

    const button: React.RefObject<HTMLButtonElement> = useRef(null);
    const root = useRef(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const onClick = () => {
        timelineRef.current?.play();
        if (!timelineRef.current?.isActive()) {
            timelineRef.current?.restart();
        }
    }
    useEffect(() => {
        /* console.log(PSD) */
    }, [])

    return (
        <>
            <div className={styles.header}>

            </div>
        </>
    )
}
import styles from './Asteroid.module.css'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import asteroid from '../../assets/images/Asteroid.png'

export default function Asteroid({ children, galaxyBkg }: {children: React.ReactNode, galaxyBkg: React.RefObject<HTMLDivElement> | null}) {

    const button: React.RefObject<HTMLButtonElement> = useRef(null);
    const root = useRef(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
    }, [galaxyBkg])

    return (
        <>
            <div ref={galaxyBkg} className={styles.asteroid}>
                {children}
            </div>
        </>
    )
}
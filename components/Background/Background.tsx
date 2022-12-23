import styles from './Background.module.css'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import nebulosa from '../../assets/images/nebulosa.png'

export default function Background({ children }: {children: React.ReactNode}) {

    const button: React.RefObject<HTMLButtonElement> = useRef(null);
    const root = useRef(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
    }, [])

    return (
        <>
            <div ref={root} className={styles.background}>
                {children}
            </div>
        </>
    )
}
import React, { useRef, useEffect, useState, use } from 'react'
import styles from './Space.module.css'
import gsap from 'gsap';
import Asteroid from '../../components/Asteroid/Asteroid'
import Galaxy from '../../components/GalaxyBkg/Galaxy';
import Spaceship from '../../components/Spaceship/Spaceship';
import { SP } from 'next/dist/shared/lib/utils';

export default function Home() {
    const [pageHeight, setHeight] = useState(0);
    const [pageWidth, setWidth] = useState(0);

/*     let galaxyBkg = useRef(null);
    let asteroidRef: React.RefObject<HTMLDivElement> | undefined = useRef(null);
    const button: React.RefObject<HTMLButtonElement> = useRef(null); */
    const root = useRef(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

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
            <div className={styles.main}>
                <Galaxy />
                <Asteroid timeline={timelineRef} />
                <Spaceship timeline={timelineRef}/>
            </div>
        </>
    )

}
import React, { useRef, useEffect } from 'react'
import styles from './Home.module.css'
import gsap from 'gsap';

import ImageRotator from '../../components/ImageRotator/ImageRotator';
import css from 'styled-jsx/css';
export default function Home() {
    /*   let galaxyBkg = useRef(null);
      let asteroidRef: React.RefObject<HTMLDivElement> | undefined = useRef(null);
      const button: React.RefObject<HTMLButtonElement> = useRef(null);
      const root = useRef(null);
      const timelineRef = useRef<gsap.core.Timeline | null>(null); */


    // pa usar despues
    function genRandom(min: number, max: number, nofloor?: boolean) {
        return nofloor ?
            Math.random() * (max - min) + 0.7
            : Math.floor(Math.random() * (max - min));
    }

    useEffect(() => {
        /*        timelineRef.current = gsap
                   .timeline({ paused: true })
                   .to(root.current, {
                       rotation: "+=360",
                       duration: 3
                   })
       
               return () => {
                   timelineRef.current?.kill();
               }; */
    }, [])


    return (
        <>
            <div className={styles.home}><ImageRotator /></div>

        </>
    )

}
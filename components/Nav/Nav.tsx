import styles from './Nav.module.css'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import gsap from 'gsap';


export default function Nav() {
    const navRef: React.RefObject<HTMLElement> = useRef(null);
    const listRef: React.RefObject<HTMLUListElement> = useRef(null);

    const root = useRef(null);
    const router = useRouter()

    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    function handleNavClick() {
        if (timelineRef.current?.reversed() || timelineRef.current?.paused()) {
            timelineRef.current?.play();
        } else {
            timelineRef.current?.reverse();
        }
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log(e.target)
        if (e.target instanceof HTMLAnchorElement) {
            router.push(e.target.href)
        }
        //once route changes, close nav
        timelineRef.current?.reverse();
    }

    useEffect(() => {

        timelineRef.current = gsap.timeline({
            paused: true,
            defaults: {
                duration: 0.5,
                ease: 'power2.inOut',
            },
        })

        timelineRef.current.to(navRef.current, {
            width: '100%',

        })
            .to(listRef.current, {
                opacity: 1,
                visibility: 'visible'
            }, '-=0.5')

        return () => {
            timelineRef.current?.kill();
        }
    }, [])

    return (
        <>
            <button className={styles.button} onClick={handleNavClick} >
                Open
            </button>
            <nav className={styles.nav} ref={navRef} >
                <ul className={styles.list} ref={listRef} >
                    <li className={styles.listItem} >
                        <a href='/' onClick={(e) => handleClick(e)} className={styles.link}>
                        🏠 I wanna go home
                        </a>
                    </li>
                    <li className={styles.listItem}>
                        <a href='/space' onClick={(e) => handleClick(e)} className={styles.link}>
                            to the m00n... 🌌 🚀
                        </a>
                    </li>

                    <li className={styles.listItem}>
                        <a href='/develop' onClick={handleClick} className={styles.link}>
                        🔭 Show me a peek even if its not finished
                        </a>
                    </li>
                    <li className={styles.listItem}>
                        <a href='/vfx' onClick={handleClick} className={styles.link}>
                           Go to inverse color camera visual effect 🤳 🤳
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}


import styles from './Header.module.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Header() {

    const button: React.RefObject<HTMLButtonElement> = useRef(null);
    const root = useRef(null);
    const timeline = gsap.timeline({repeat: 1});
    const onClick = () => {
        if (timeline.isActive()) {
            timeline.restart()
        } else {
            timeline.to(root.current, { rotation: "+=360", duration: 3 });
        }


    }

    useEffect(() => {


    }, [])

    return (
        <>
            <header className={styles.header}>
                <div className={styles.content} >
                    <h1 ref={root} className={styles.h1}>This is a Website</h1>
                    <button ref={button} onClick={() => onClick()}>Clicky Clicky</button>
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
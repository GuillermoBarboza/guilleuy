import styles from './Galaxy.module.css'
import React from 'react'
import galaxy from '../../assets/images/nebulosa.png'
import Image from 'next/image'

export default function Galaxy() {

    return (
        <>
            <div
                className={styles.galaxyWrapper}
            >
                <Image
                    className={styles.galaxy}
                    src={galaxy}
                    alt={''} />
            </div>
        </>
    )
}
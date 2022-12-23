import Head from 'next/head'
import React, { useRef, useEffect } from 'react'
import styles from '../styles/Home.module.css'

import Header from '../components/Header/Header'
import Background from '../components/Background/Background'

export default function Home() {
  let galaxyBkg = useRef(null);


  return (
    <>
      <Head>
        <title>Create Guille App</title>
        <meta name="description" content="This is my personal website, I intend to use this space to explore my creativity and see if I can do something fun for the sake of. Enjoy!" />

        <meta property="og:title" content="La página del Guille" />
        <meta
          property="og:description"
          content="This is my personal website and I just began throwing stuff at it. I intend to use this space to explore my creativity and see if I can do something fun for the sake of. Enjoy!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header galaxyBkg={galaxyBkg}/>
      <main className={styles.main}>
        <div ref={galaxyBkg} className={styles.background}>

        </div>
      </main>
      <footer>

      </footer>
    </>
  )
}

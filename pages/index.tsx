import Head from 'next/head'
import React, { useRef, RefObject } from 'react'
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

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header galaxyBkg={galaxyBkg}/>
      <main className={styles.main}>
        <Background galaxyBkg={galaxyBkg}>

        </Background>
      </main>
      <footer>

      </footer>
    </>
  )
}

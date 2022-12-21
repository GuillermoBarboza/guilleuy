import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Header/Header'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Guille App</title>
        <meta name="description" content="This is my personal website, I intend to use this space to explore my creativity and see if I can do something fun for the sake of. Enjoy!" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>

      </main>
      <footer>

      </footer>
    </>
  )
}

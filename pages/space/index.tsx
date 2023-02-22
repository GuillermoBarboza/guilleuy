import Head from 'next/head'
import Script from 'next/script';
import React, { useRef, useEffect } from 'react'
import Space from '../../layouts/Space/Space'
import { useState } from 'react'

const PAGES = {home: 'HOME', space: 'SPACE'}

export default function Page() {

  return (
    <>
      <Head>
        {/* <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
                    `
          }}
        /> */}
        <title>GGS</title>
        <meta name="description" content="Welcome to Guille's GSAP.js's Space! Here you will see some animations and effects I started learning in creativecodingclub.com" />

        <meta property="og:title" content="Guille's GSAP's Space" />
        <meta
          property="og:description"
          content="Welcome to Guille's GSAP.js's Space! Here you will see some animations and effects I started learning in creativecodingclub.com"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', '${process.env.NEXT_PUBLIC_GTA_ID}');
                    `
        }}
      />
    
      <main>
        <Space />
      </main>
      <footer>

      </footer>
    </>
  )

}
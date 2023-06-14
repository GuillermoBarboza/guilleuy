import Head from "next/head";
import Script from "next/script";
import React, { useRef, useEffect } from "react";
import Vfx from "../../components/Vfx/Vfx";
import Webxr from "../../components/Webxr/Webxr";
import Scene1 from "../../components/Scene1/Scene1";
import Cube from "../../components/Cube/Cube";
import RadioForm from "../../components/Form/RadioForm";
import { useState } from "react";

const PAGES = { home: "HOME", space: "SPACE" };

export default function Page() {
  const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <>
      <Head>
        <title>L.P.D.G. VFX</title>
        <meta
          name="description"
          content="This is my personal website, I intend to use this space to explore my creativity and see if I can do something fun for the sake of. Enjoy!"
        />

        <meta property="og:title" content="La página del Guille" />
        <meta
          property="og:description"
          content="This is my personal website and I just began throwing stuff at it. I intend to use this space to explore my creativity and see if I can do something fun for the sake of. Enjoy!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RadioForm
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        {selectedOption === "option1" && <Cube />}
        {selectedOption === "option2" && <Scene1 />}
      </main>
      <footer></footer>
    </>
  );
}

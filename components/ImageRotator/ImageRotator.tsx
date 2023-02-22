import { FC, memo, useEffect, useRef, useCallback, useState } from 'react';
import classNames from 'classnames';

import css from './ImageRotator.module.scss';

import gsap from 'gsap';

import cat from '../../assets/images/cat.jpg'
import bee from '../../assets/images/bee.jpg'
import monkey from '../../assets/images/monkey.jpg'
import fourth from '../../assets/images/4.jpeg'

export type ImageRotatorProps = {
  className?: string;
  autoplay?: boolean;
  children?: React.ReactNode;
  duration?: number | Array<number>;
};

type Timeline = gsap.core.Timeline;

const ImageRotator: FC<ImageRotatorProps> = ({ className, autoplay, children }) => {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<(HTMLCanvasElement | null)>();
  const timeline = useRef<GSAPTimeline>();
  const [itemIndex, setItemIindex] = useState(0);

  const increment = (index: number, by: number = 0) => {
    let currentNumber = index;
    for (let lap = 0; lap < by; lap++) {
      currentNumber = currentNumber + 1 > imagesRef.current.length - 1 ? 0 : currentNumber + 1
    };

    return currentNumber;
  }

  const decrese = (index: number, by: number = 0) => {
    let newIndex = index;
    for (let lap = 0; lap < by; lap++) {
      newIndex = newIndex - 1 === -1 ? imagesRef.current.length - 1 : newIndex - 1
    };
    return newIndex;
  }

  const animate = useCallback(() => {
    timeline.current = gsap.timeline()
    imagesRef.current.forEach((image, index) => {
      if (index === itemIndex) {
        const ctx = canvasRef.current?.getContext("2d");
        ctx.drawImage(image, 0, 0, canvasRef.current?.width, canvasRef.current?.height);

        timeline.current.to(image, {
          duration: 1.333,
          x: 0,
          y: 0,
          zIndex: imagesRef.current.length,
          opacity: 0,
          ease: "power4.out"
        }, 0)
          .set(image, {
            x: -25 * imagesRef.current.length,
            y: -25 * imagesRef.current.length,
            zIndex: 1,
            opacity: 0.1
          })
          .to(canvasRef.current, {
            duration: 1.333,
            x: -25 * (imagesRef.current.length - 2),
            y: -25 * (imagesRef.current.length - 2),
            zIndex: 1,
            opacity: 0.1,
            ease: "power4.out"
          }, 0)
          .set(canvasRef.current, {
            opacity: 0
          })
      } else {
        timeline.current.to(image, {
          duration: 1.333,
          x: -25 * decrese(itemIndex, index),
          y: -25 * decrese(itemIndex, index),
          zIndex: - decrese(itemIndex, index) + imagesRef.current.length,
          opacity: index === decrese(itemIndex, 1) ?
            1
            : 0.1 * (imagesRef.current.length + 1 - decrese(itemIndex, index)),
          ease: "power4.out"
        }, 0)
      }
    })
    let newIndex = decrese(itemIndex, 1)
    setItemIindex(newIndex);
  }, [itemIndex])

  useEffect(() => {
    timeline.current = gsap.timeline()
    imagesRef.current.forEach((image, index) => {
      let opacity = index === imagesRef.current.length - 1 ?
        1
        : 0.1 * (index + 1);
      timeline.current.set(image, {
        x: -25 * (imagesRef.current.length - index),
        y: -25 * (imagesRef.current.length - index),
        zIndex: index + 1,
        opacity: opacity
      }, 0)
    })
    setItemIindex(imagesRef.current.length - 1)
    return () => {
      timeline.current?.kill()
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const image = imagesRef.current[imagesRef.current.length - 1];
    ctx?.scale(2, 1)
    ctx.drawImage(image, 0, 0, canvasRef.current?.width, canvasRef.current?.height);
    gsap.set(canvas, {
      x: -25 * (imagesRef.current.length - 1),
      y: -25 * (imagesRef.current.length - 1),
      zIndex: -(imagesRef.current.length + 1),
      opacity: 0
    })
  }, [imagesRef, canvasRef])

  return (
    <div className={classNames('ImageRotator', css.root, className)}>
      <div className={css.images}>
        <canvas height={700} width={500} className={css.canvas} id="canvas" ref={(ref) => (canvasRef.current = ref)}></canvas>
        <div className={css.imageContainer}>
          <img id='monke' ref={(ref) => (imagesRef.current[0] = ref)} className={css.image} src={cat.src} alt='think later 1' />
          <img id='bee' ref={(ref) => (imagesRef.current[1] = ref)} className={css.image} src={bee.src} alt='think later 2' />
          <img id='cat' ref={(ref) => (imagesRef.current[2] = ref)} className={css.image} src={monkey.src} alt='think later 3' />
          <img id='red' ref={(ref) => (imagesRef.current[3] = ref)} className={css.image} src={fourth.src} alt='think later 4' />
        </div>

      </div>

      <div className={css.items}>
        <div ref={(ref) => (itemsRef.current[0] = ref)} className={css.item}>
          <h4 className={css.title}>Titulo 1</h4>
          <div className={css.content}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, ex praesentium nostrum sapiente, rem consequuntur aspernatur temporibus minima, esse exercitationem et? Similique consequatur mollitia quaerat rerum eum accusantium molestias dignissimos!</p>
            <button>Check out more</button>
          </div>
        </div>

        <div ref={(ref) => (itemsRef.current[1] = ref)} className={css.item}>
          <h4 className={css.title}>Titulo 2</h4>
          <div className={css.content}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, ex praesentium nostrum sapiente, rem consequuntur aspernatur temporibus minima, esse exercitationem et? Similique consequatur mollitia quaerat rerum eum accusantium molestias dignissimos!</p>
            <button>Check out more</button>
          </div>

        </div>

        <div ref={(ref) => (itemsRef.current[2] = ref)} className={css.item}>
          <h4 className={css.title}>Titulo 3</h4>
          <div className={css.content}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, ex praesentium nostrum sapiente, rem consequuntur aspernatur temporibus minima, esse exercitationem et? Similique consequatur mollitia quaerat rerum eum accusantium molestias dignissimos!</p>
            <button>Check out more</button>
          </div>
        </div>
        <button className={css.trigger} onClick={() => console.log("current image is:", timeline.current?.isActive())}>TCheck</button>
        <button className={css.trigger} onClick={() => { if (!timeline.current?.isActive()) { animate() } }}>TRI GG Errrrr</button>
      </div>

    </div>
  );
};

export default memo(ImageRotator);

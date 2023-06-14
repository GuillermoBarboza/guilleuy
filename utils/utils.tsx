import GUI from "lil-gui";

const gui = new GUI();

export default gui;

export function getPixelsAndApplyFilter(imageData: ImageData): ImageData {
  for (let index = 0; index < imageData.data.length; index += 4) {
    imageData.data[index] = imageData.data[index] + 32;
    imageData.data[index + 1] = imageData.data[index + 1] - 15;
    imageData.data[index + 2] = imageData.data[index + 2] + 89;
  }
  /*  let pixels: Array<{ r: number; g: number; b: number, x: number, y: number }> = [];

     for (let index = 0; index < imageData.data.length; index += 4) {

         const pixelIndex = index / 4;

         const newPixel = {
             r: imageData.data[index],
             g: imageData.data[index + 1],
             b: imageData.data[index + 2],
             x: pixelIndex % imageData.width,
             y: Math.floor(pixelIndex / imageData.width)
         }; 

         pixels.push(newPixel)
     }*/

  return imageData;
}

export function getPixelLocation(
  imageData: ImageData,
  color: { r: number; g: number; b: number }
): Array<{ x: number; y: number }> {
  let newPixels: Array<{ x: number; y: number }> = [];

  for (let index = 0; index < imageData.data.length; index += 4) {
    const newPixel = {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
    };
    const pixelIndex = index / 4;

    const pixelLocation = {
      x: pixelIndex % imageData.width,
      y: Math.floor(pixelIndex / imageData.width),
    };

    if (colorMatch(newPixel, color)) {
      newPixels.push(pixelLocation);
    }
  }
  return newPixels;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

interface Color {
  r: number;
  g: number;
  b: number;
}

export function colorMatch(color1: Color, color2: Color, threshold = 160) {
  return (
    (color1.r - color2.r) ** 2 +
      (color1.g - color2.g) ** 2 +
      (color1.b - color2.b) ** 2 <
    threshold * threshold
  );
}

function draw2DGrayscaleImage({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  height -= 100;
  width -= 200;

  text(offsetX/2 + screenWidth/2, screenHeight/2, 'Calculating...', {color: '#666'});

  const calculate = () => {
    const result = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = multiply(getValueFn(x, y)[0], octave);

        const xPos = offsetX + x + 100;
        const yPos = offsetY + height + 100 - y;

        result.push({xPos, yPos, value});
      }
    }

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    let maxValue = 0;

    result.forEach(({value}) => {
      maxValue = Math.max(maxValue, value);
    });

    result.forEach(({xPos, yPos, value}) => {
      const bw = map(0, maxValue, 0, 255, value);

      context.fillStyle = `rgb(${bw}, ${bw}, ${bw})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}
function draw2DStaticImage({
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
        const color = map(0, amplitude, 0, 255, getValueFn(x, y)[0]);

        const xPos = offsetX + x + 100;
        const yPos = offsetY + height + 100 - y;

        result.push({xPos, yPos, color});
      }
    }

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    result.forEach(({xPos, yPos, color}) => {
      context.fillStyle = `rgb(${color}, ${color}, ${color})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}
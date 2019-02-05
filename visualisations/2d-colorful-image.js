function draw2DColorfulImage({
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
        const value = getValueFn(x, y);
        const r = map(0, amplitude, 0, 255, value[0]);
        const g = map(0, amplitude, 0, 255, value[1]);
        const b = map(0, amplitude, 0, 255, value[2]);

        const xPos = offsetX + x + 100;
        const yPos = offsetY + height + 100 - y;

        result.push({xPos, yPos, r, g, b});
      }
    }

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    result.forEach(({xPos, yPos, r, g, b}) => {
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}
function draw2DWoodImage({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  height -= 100;
  width -= 200;

  context.clearRect(0, 0, screenWidth, screenHeight);
  text(offsetX/2 + screenWidth/2, screenHeight/2, 'Calculating...', {color: '#666'});

  const calculate = () => {
    const result = [];
    const xPosBase = offsetX + 100;
    const yPosBase = offsetY + height + 100;

    let maxValue = -Infinity;
    let minValue = Infinity;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = getValueFn(x, y);

        maxValue = max(maxValue, value);
        minValue = min(minValue, value);

        result.push([xPosBase + x, yPosBase - y, value]);
      }
    }

    result.forEach(r => {
      const g = map(minValue, maxValue, 0, 1, r[2]) * 10;
      const val = g - floor(g);
      r[2] = map(0, 1, 0, 255, val);
    });

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    result.forEach(([xPos, yPos, value]) => {
      context.fillStyle = `rgb(${value}, ${value}, ${value})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}
function draw2DColorfulWoodImage({
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
        const r = map(0, amplitude, 0, 255, getValueFn(x + 2/frequency, y + 2/frequency));
        const g = map(0, amplitude, 0, 255, getValueFn(x + 64/frequency, y + 64/frequency));
        const b = map(0, amplitude, 0, 255, getValueFn(x + 128/frequency, y + 128/frequency));

        maxValue = max(maxValue, r, g, b);
        minValue = min(minValue, r, g, b);

        result.push([xPosBase + x, yPosBase - y, r, g, b]);
      }
    }

    result.forEach(r => {
      const gR = map(minValue, maxValue, 0, 1, r[2]) * 10;
      const gG = map(minValue, maxValue, 0, 1, r[3]) * 10;
      const gB = map(minValue, maxValue, 0, 1, r[4]) * 10;

      r[2] = map(0, 1, 0, 255, gR - floor(gR));
      r[3] = map(0, 1, 0, 255, gG - floor(gG));
      r[4] = map(0, 1, 0, 255, gB - floor(gB));
    });

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    result.forEach(([xPos, yPos, r, g, b]) => {
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}
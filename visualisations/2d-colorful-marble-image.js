function draw2DColorfulMarbleImage({
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

        result.push([xPosBase + x, yPosBase - y, x, r, g, b]);
      }
    }

    result.forEach(rs => {
      const [,,x,rV,gV,bV] = rs;

      const rI = map(minValue, maxValue, 0, 1, rV);
      const gI = map(minValue, maxValue, 0, 1, gV);
      const bI = map(minValue, maxValue, 0, 1, bV);

      const r = (sin((x + rI * 100) * 2 * PI / 200) + 1) / 2;
      const g = (sin((x + gI * 100) * 2 * PI / 200) + 1) / 2;
      const b = (sin((x + bI * 100) * 2 * PI / 200) + 1) / 2;

      rs[3] = map(0, 1, 0, 255, r);
      rs[4] = map(0, 1, 0, 255, g);
      rs[5] = map(0, 1, 0, 255, b);
    });

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    result.forEach(([xPos, yPos, , r, g, b]) => {
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}
function draw2DColorfulMarbleImage({
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
        const value = multiply(getValueFn(x, y), octave);

        const xPos = offsetX + x + 100;
        const yPos = offsetY + height + 100 - y;

        result.push({xPos, yPos, value, x});
      }
    }

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    let maxValue = 0;

    result.forEach(({value}) => {
      maxValue = Math.max(maxValue, Math.max(...value));
    });

    result.forEach(({xPos, yPos, value, x}) => {
      const rI = map(0, maxValue, 0, 1, value[0]);
      const gI = map(0, maxValue, 0, 1, value[1]);
      const bI = map(0, maxValue, 0, 1, value[2]);

      const valR = (sin((x + rI * 100) * 2 * PI / 200) + 1) / 2;
      const valG = (sin((x + gI * 100) * 2 * PI / 200) + 1) / 2;
      const valB = (sin((x + bI * 100) * 2 * PI / 200) + 1) / 2;

      const r = map(0, 1, 0, 255, valR);
      const g = map(0, 1, 0, 255, valG);
      const b = map(0, 1, 0, 255, valB);

      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}
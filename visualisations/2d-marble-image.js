function draw2DMarbleImage({
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

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = multiply(getValueFn(x, y)[0], octave);

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
      maxValue = Math.max(maxValue, value);
    });

    result.forEach(({xPos, yPos, value, x}) => {
      const i = map(0, maxValue, 0, 1, value);
      const val = (sin((x + i * 100) * 2 * PI / 200) + 1) / 2;
      const bw = map(0, 1, 0, 255, val);

      context.fillStyle = `rgb(${bw}, ${bw}, ${bw})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}

function draw2DMarbleImage({
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
    const xPosBase = offsetX + 100;
    const yPosBase = offsetY + height + 100;

    let maxValue = -Infinity;
    let minValue = Infinity;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = getValueFn(x, y);

        maxValue = max(maxValue, value);
        minValue = min(minValue, value);

        result.push([xPosBase + x, yPosBase - y, x, value]);
      }
    }

    result.forEach(r => {
      const [,,x,value] = r;
      const i = map(minValue, maxValue, 0, 1, value);
      const val = (sin((x + i * 100) * 2 * PI / 200) + 1) / 2;
      r[3] = map(0, 1, 0, 255, val);
    });

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    result.forEach(([xPos, yPos, , value]) => {
      context.fillStyle = `rgb(${value}, ${value}, ${value})`;
      context.fillRect(xPos, yPos, 1, 1);
    });
  });
}
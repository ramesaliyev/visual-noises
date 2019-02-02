function draw1DRGBLines({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  context.clearRect(offsetX, height-1, offsetX + width, 3);
  dashedLine(offsetX, height, offsetX + width, height, {color:'#333'});

  for (let x = 0; x < width; x++) {
    const values = getValueFn(x);

    const xPos = offsetX + x;
    const yPosBase = offsetY + height;

    const rY = values[0];
    const gY = values[1];
    const bY = values[2];

    const r = map(0, 1, 0, 255, rY / amplitude);
    const g = map(0, 1, 0, 255, gY / amplitude);
    const b = map(0, 1, 0, 255, bY / amplitude);

    line(xPos, yPosBase - rY, xPos, yPosBase - rY - 1, {color: `rgb(${r}, ${g}, ${b})`});
    line(xPos, yPosBase - gY, xPos, yPosBase - gY - 1, {color: `rgb(${r}, ${g}, ${b})`});
    line(xPos, yPosBase - bY, xPos, yPosBase - bY - 1, {color: `rgb(${r}, ${g}, ${b})`});
  }
}
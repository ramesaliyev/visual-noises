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
    const xPos = offsetX + x;
    const yPosBase = offsetY + height;

    const rY = getValueFn(x + 2/frequency);
    const gY = getValueFn(x + 64/frequency);
    const bY = getValueFn(x + 128/frequency);

    const r = map(0, amplitude, 0, 255, rY);
    const g = map(0, amplitude, 0, 255, gY);
    const b = map(0, amplitude, 0, 255, bY);

    line(xPos, 100, xPos, 101, {color: `rgb(${r}, ${g}, ${b})`});
    line(xPos, yPosBase - rY, xPos, yPosBase - rY - 1, {color: `rgb(${r}, ${0}, ${0})`});
    line(xPos, yPosBase - gY, xPos, yPosBase - gY - 1, {color: `rgb(${0}, ${g}, ${0})`});
    line(xPos, yPosBase - bY, xPos, yPosBase - bY - 1, {color: `rgb(${0}, ${0}, ${b})`});
  }
}
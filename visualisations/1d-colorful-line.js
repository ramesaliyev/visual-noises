function draw1DColorfulLine({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  context.clearRect(offsetX, height-1, offsetX + width, 3);
  dashedLine(offsetX, height, offsetX + width, height, {color:'#333'});

  for (let x = 0; x < width; x++) {
    const value = getValueFn(x);
    const y = value[0];

    const xPos = offsetX + x;
    const yPos = offsetY + height - y;

    const r = map(0, amplitude, 0, 255, value[0]);
    const g = map(0, amplitude, 0, 255, value[1]);
    const b = map(0, amplitude, 0, 255, value[2]);

    line(xPos, yPos, xPos, yPos - 1, {color: `rgb(${r}, ${g}, ${b})`});
  }
}
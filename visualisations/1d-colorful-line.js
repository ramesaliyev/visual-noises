function draw1DColorfulLine({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  for (let x = 0; x < width; x++) {
    const value = getValueFn(x);
    const y = value[0];

    const xPos = offsetX + x;
    const yPos = offsetY + height - y;

    const r = map(0, 1, 0, 255, value[0] / amplitude);
    const g = map(0, 1, 0, 255, value[1] / amplitude);
    const b = map(0, 1, 0, 255, value[2] / amplitude);

    line(xPos, yPos, xPos, yPos - 1, {color: `rgb(${r}, ${g}, ${b})`});
  }
}
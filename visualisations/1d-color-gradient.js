function draw1DColorGradient({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  for (let x = 0; x < width - 100; x++) {
    const values = getValueFn(x);

    const xPos = offsetX + x;

    const r = map(0, amplitude, 0, 255, values[0]);
    const g = map(0, amplitude, 0, 255, values[1]);
    const b = map(0, amplitude, 0, 255, values[2]);

    line(xPos + 50, offsetY + 50, xPos + 50, offsetY + 150, {color: `rgb(${r}, ${g}, ${b})`});
  }
}
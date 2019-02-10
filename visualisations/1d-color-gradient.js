function draw1DColorGradient({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  for (let x = 0; x < width - 100; x++) {
    const xPos = offsetX + x;

    const r = floor(255 * getValueFn(x + 2/frequency));
    const g = floor(255 * getValueFn(x + 64/frequency));
    const b = floor(255 * getValueFn(x + 128/frequency));

    line(xPos + 50, offsetY + 50, xPos + 50, offsetY + 150, {color: `rgb(${r}, ${g}, ${b})`});
  }
}
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
    const y = getValueFn(x) * amplitude;

    const xPos = offsetX + x;
    const yPos = offsetY + height - y;

    const r = floor(255 * getValueFn(x + 2/frequency));
    const g = floor(255 * getValueFn(x + 64/frequency));
    const b = floor(255 * getValueFn(x + 128/frequency));

    line(xPos, yPos, xPos, yPos - 1, {color: `rgb(${r}, ${g}, ${b})`});
  }
}
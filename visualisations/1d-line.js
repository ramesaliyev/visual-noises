function draw1DLine({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height,
  color = '#f0f0f0',
}) {
  context.clearRect(offsetX, height-1, offsetX + width, 3);
  dashedLine(offsetX, height, offsetX + width, height, {color:'#333'});

  for (let x = 0; x < width; x++) {
    const y = getValueFn(x)[0];

    const xPos = offsetX + x;
    const yPos = offsetY + height - y;

    line(xPos, yPos, xPos, yPos - 1, {color});
  }
}
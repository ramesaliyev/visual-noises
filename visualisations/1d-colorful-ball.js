function draw1DColorfulBall({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height,
  color = '#f0f0f0',
}) {
  context.clearRect(offsetX, height-1, offsetX + width, 3);
  dashedLine(offsetX, height, offsetX + width, height, {color:'#333'});

  const y = getValueFn(0);

  const radius = 20;
  const xPos = offsetX + (width / 2);
  const yPos = offsetY + height - radius/2 - y;

  const r = floor(255 * getValueFn(y + 2/frequency) / amplitude);
  const g = floor(255 * getValueFn(y + 64/frequency) / amplitude);
  const b = floor(255 * getValueFn(y + 128/frequency / amplitude));

  circle(xPos, yPos, radius, {color: `rgb(${r}, ${g}, ${b})`});
}
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

  const value = getValueFn(0);
  const y = value[0];

  const radius = 20;
  const xPos = offsetX + (width / 2);
  const yPos = offsetY + height - radius/2 - y;

  const r = map(0, 1, 0, 255, value[0] / amplitude);
  const g = map(0, 1, 0, 255, value[1] / amplitude);
  const b = map(0, 1, 0, 255, value[2] / amplitude);

  circle(xPos, yPos, radius, {color: `rgb(${r}, ${g}, ${b})`});
}
function draw1DBall({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height,
  color = '#f0f0f0',
}) {
  context.clearRect(offsetX, height-1, offsetX + width, 3);
  dashedLine(offsetX, height, offsetX + width, height, {color:'#333'});

  const y = getValueFn(0)[0];

  const radius = 20;
  const xPos = offsetX + (width / 2);
  const yPos = offsetY + height - radius/2 - y;

  circle(xPos, yPos, radius, {color});
}
function draw1DRadiusBall({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height,
  color = '#f0f0f0',
}) {
  context.clearRect(offsetX, height-1, offsetX + width, 3);
  dashedLine(offsetX, height, offsetX + width, height, {color:'#333'});

  const y = getValueFn(0) / amplitude;

  const maxRadius = 200;
  const radius = y * maxRadius;
  const xPos = offsetX + width/2;
  const yPos = offsetY + height/2;

  circle(xPos, yPos, radius, {color});
}
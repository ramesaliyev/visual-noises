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

  const r = map(0, amplitude, 0, 255, getValueFn(x + 2/frequency));
  const g = map(0, amplitude, 0, 255, getValueFn(x + 64/frequency));
  const b = map(0, amplitude, 0, 255, getValueFn(x + 128/frequency));

  circle(xPos, yPos, radius, {color: `rgb(${r}, ${g}, ${b})`});
}
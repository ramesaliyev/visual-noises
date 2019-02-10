function draw1DColorfulTriangle({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  const a = getValueFn(offsetX + 2/frequency) / amplitude;
  const b = getValueFn(offsetX + 64/frequency) / amplitude;
  const c = getValueFn(offsetX + 128/frequency) / amplitude;

  const x1 = offsetX + floor(width * a);
  const y1 = offsetY + floor(height * b);

  const x2 = offsetX + floor(width * b);
  const y2 = offsetY + floor(height * c);

  const x3 = offsetX + floor(width * c);
  const y3 = offsetY + floor(height * a);

  // the triangle
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.closePath();

  // the outline
  context.lineWidth = 3;
  context.strokeStyle = '#fff';
  context.stroke();

  // the fill color
  context.fillStyle = `rgb(
    ${map(0, 1, 0, 255, a)},
    ${map(0, 1, 0, 255, b)},
    ${map(0, 1, 0, 255, c)}
  )`;
  context.fill();

  circle(x1, y1, 10, {color:'#f00'});
  circle(x2, y2, 10, {color:'#0f0'});
  circle(x3, y3, 10, {color:'#00f'});
}
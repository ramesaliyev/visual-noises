function draw1DColorfulTriangle({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  const value = getValueFn(0);

  const a = value[0] / amplitude;
  const b = value[1] / amplitude;
  const c = value[2] / amplitude;

  const x1 = offsetX + map(0, 1, 0, width, a);
  const y1 = offsetY + map(0, 1, 0, height, b);

  const x2 = offsetX + map(0, 1, 0, width, b);
  const y2 = offsetY + map(0, 1, 0, height, c);

  const x3 = offsetX + map(0, 1, 0, width, c);
  const y3 = offsetY + map(0, 1, 0, height, a);


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
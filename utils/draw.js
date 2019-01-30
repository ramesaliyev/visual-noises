function circle(x, y, r, options) {
  const {
    color = '#fff',
    fill = true,
    startAngle = 0,
    endAngle = TWO_PI,
    aCW = true,
    lineWidth = 1,
  } = (options || {});

  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.fillStyle = color;
  context.moveTo(x, y);
  context.beginPath();

  fill && context.moveTo(x, y);

  context.arc(x, y, r, startAngle, endAngle, aCW);

  fill && context.closePath();
  fill ? context.fill() : context.stroke();
};

function dashedLine(xFrom, yFrom, xTo, yTo, options) {
  const {
    dashLen = 10,
    sepLen = 7,
    color = '#fff',
    lineWidth = 1
  } = (options || {});

  context.lineWidth = lineWidth;
  context.strokeStyle = color;

  context.beginPath();
  context.setLineDash([dashLen, sepLen]);
  context.moveTo(xFrom, yFrom);
  context.lineTo(xTo, yTo);
  context.stroke();
}
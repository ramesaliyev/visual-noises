/**
 * Draw circle
 */
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

/**
 * Draw line
 */
function line(fromX, fromY, toX, toY, options) {
  const {
    color = '#fff',
    lineWidth = 1,
  } = (options || {});

  context.setLineDash([]);
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
}

/**
 * Draw dashed line
 */
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
  context.setLineDash([]);
}

/**
 * Draw rectangle
 */
function rect(x, y, w, h, options) {
  const {
    color = '#fff',
    fill = true,
    lineWidth = 1,
  } = (options || {});

  context.beginPath();
  context.lineWidth = lineWidth,
  context.strokeStyle = color;
  context.fillStyle = color;
  context.rect(x, y, w, h);
  context.closePath();
  fill ? context.fill() : context.stroke();
};
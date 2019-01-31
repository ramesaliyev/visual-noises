function drawLinearInterpolationExample(pointDistance = 50) {
  context.clearRect(0, 0, screenWidth, screenHeight);

  // Set values;
  const availableWidth = (screenWidth - 100);
  const availableHeight = (screenHeight - 150);

  const totalPoint = floor(availableWidth/pointDistance) + 1;

  const axisWidth = ((totalPoint-1) * pointDistance);
  const axisHeight = 100;

  const axisStartPosX = floor((screenWidth - axisWidth) / 2);
  const axisStartPosY = 50;

  const imageWidth = axisWidth;
  const imageHeight = axisHeight;
  const imageStartPosX = axisStartPosX;
  const imageStartPosY = 500 + axisHeight;

  // Prepare grid representation.

  const points = [];

  dashedLine(axisStartPosX, axisStartPosY, axisStartPosX + axisWidth, axisStartPosY, {color: '#333'});

  for (let x = 0; x < imageWidth; x=x+2) {
    if (floor(x) !== x) console.log(x);
    line(axisStartPosX + x, axisStartPosY, axisStartPosX + x, axisStartPosY + 1000, {color: '#111'});
  }

  for (let x = 0; x < totalPoint; x++) {
    dashedLine(axisStartPosX + x*pointDistance, axisStartPosY, axisStartPosX + x*pointDistance, axisStartPosY + 1000, {color: '#333'});
  }

  for (let x = 0; x < totalPoint; x++) {
    const color = points[x] = [randomRange(0, 255), randomRange(0, 255), randomRange(0, 255)];
    circle(axisStartPosX + (x * pointDistance), axisStartPosY, 5, {color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`});
  }

  // Image generation by bilinear interpolation from 2D grid.

  dashedLine(axisStartPosX, 500, axisStartPosX + axisWidth, 500, {color: '#333'});

  for (let x = 0; x < (imageWidth); x++) {
    const pointX = floor(x / pointDistance);

    const tx = (x % pointDistance) / pointDistance;

    const left = points[pointX];
    const right = points[pointX+1];

    const color = lerp(left, right, tx);

    const xPos = imageStartPosX + x;
    const yPos = imageStartPosY;

    line(xPos, axisStartPosY+30, xPos, axisStartPosY+65, {color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`});

    line(xPos, 505, xPos, 510, {color: `rgb(${0}, ${0}, ${color[2]})`});
    line(xPos, 515, xPos, 520, {color: `rgb(${0}, ${color[1]}, ${0})`});
    line(xPos, 525, xPos, 530, {color: `rgb(${color[0]}, ${0}, ${0})`});

    line(xPos, 500-color[2], xPos, 500-color[2]-1, {color: `rgb(${0}, ${0}, ${color[2]})`});
    line(xPos, 500-color[1], xPos, 500-color[1]-1, {color: `rgb(${0}, ${color[1]}, ${0})`});
    line(xPos, 500-color[0], xPos, 500-color[0]-1, {color: `rgb(${color[0]}, ${0}, ${0})`});
  }
}
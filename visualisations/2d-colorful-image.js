function draw2DColorfulImage({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height
}) {
  height -= 100;
  width -= 200;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r = map(0, 1, 0, 255, getValueFn(x/amplitude, y/amplitude)[0] / amplitude);
      const g = map(0, 1, 0, 255, getValueFn(x/amplitude, y/amplitude)[1] / amplitude);
      const b = map(0, 1, 0, 255, getValueFn(x/amplitude, y/amplitude)[2] / amplitude);

      const xPos = offsetX + x + 100;
      const yPos = offsetY + height + 100 - y;

      line(xPos, yPos, xPos, yPos - 1, {color: `rgb(${r}, ${g}, ${b})`});
    }
  }
}
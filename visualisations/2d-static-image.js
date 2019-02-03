function draw2DStaticImage({
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
      const color = map(0, 1, 0, 255, getValueFn(x/amplitude, y/amplitude)[0] / amplitude);

      const xPos = offsetX + x + 100;
      const yPos = offsetY + height + 100 - y;

      line(xPos, yPos, xPos, yPos - 1, {color: `rgb(${color}, ${color}, ${color})`});
    }
  }
}
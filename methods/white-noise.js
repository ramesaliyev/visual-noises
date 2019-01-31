function drawWhiteNoiseExample() {
  context.clearRect(0, 0, screenWidth, screenHeight);

  const imageWidth = (screenWidth - 100);
  const imageHeight = (screenHeight - 100);

  const imageStartPosX = 50;
  const imageStartPosY = 50;

  for (let y = 0; y < (imageHeight); y++) {
    for (let x = 0; x < (imageWidth); x++) {
      const xPos = imageStartPosX + x;
      const yPos = imageStartPosY + y;

      const color = [randomRange(0, 255), randomRange(0, 255), randomRange(0, 255)];

      line(xPos, yPos, xPos, yPos+1, {color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`});
    }
  };

}
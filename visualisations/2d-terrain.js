function draw2DTerrainImage({
  getValueFn,
  offsetX,
  offsetY,
  width,
  height,
  done
}) {
  height -= 100;
  width -= 200;

  const tileSize = 4;

  const calculate = () => {
    const result = [];
    const xPosBase = offsetX + 100;
    const yPosBase = offsetY + height + 100;

    for (let y = 0; y < height/tileSize; y++) {
      for (let x = 0; x < width/tileSize; x++) {
        const value = getValueFn(x, y);

        result.push([
          xPosBase + (x * tileSize),
          yPosBase - (y * tileSize),
          value
        ]);
      }
    }

    return result;
  }

  run(calculate, {getValueFn, height, width, offsetX, offsetY, tileSize}, result => {
    context.clearRect(0, 0, screenWidth, screenHeight);

    result.forEach(([xPos, yPos, value]) => {
      let color;

      if (value < 0.4) { color = '#05B2DC'; } // sea
      else if (value < 0.42) { color = '#FFC857'; } // sand
      else if (value < 0.54) { color = '#52AA5E'; } // grass
      else { color = '#004F2D'; } // forest

      context.fillStyle = `${color}`;
      context.fillRect(xPos, yPos, tileSize, tileSize);
    });

    done();
  });

  return true;
}
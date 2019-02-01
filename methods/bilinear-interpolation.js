function drawBilinearInterpolationExample(gridCellSize = 75, seed) {
  seed && setRandomSeed(seed);

  context.clearRect(0, 0, screenWidth, screenHeight);

  // Set values;
  const availableWidth = (screenWidth - 100);
  const availableHeight = (screenHeight - 150) / 2;

  const gridVertexCountX = floor(availableWidth/gridCellSize) + 1;
  const gridVertexCountY = floor(availableHeight/gridCellSize) + 1;

  const gridWidth = ((gridVertexCountX-1) * gridCellSize);
  const gridHeight = ((gridVertexCountY-1) * gridCellSize);

  const gridStartPosX = (screenWidth - gridWidth) / 2;
  const gridStartPosY = 50;

  const imageWidth = gridWidth;
  const imageHeight = gridHeight;
  const imageStartPosX = gridStartPosX;
  const imageStartPosY = 100 + gridHeight;

  // Prepare grid representation.

  const grid = [];

  for (let y = 0; y < gridVertexCountY; y++) {
    const yPos = gridStartPosY + y*gridCellSize;

    dashedLine(gridStartPosX, yPos, gridStartPosX + gridWidth, yPos, {color: '#333'});

    for (let x = 0; x < gridVertexCountX; x++) {
      const xPos = gridStartPosX + x*gridCellSize;

      dashedLine(xPos, gridStartPosY, xPos, gridStartPosY + gridHeight, {color: '#333'});

      const color = [srandRange(0, 255), srandRange(0, 255), srandRange(0, 255)];

      grid[y*gridVertexCountX + x] = color;
    }
  };

  grid.forEach((vertex, index) => {
    const yPos = gridStartPosY + floor(index / gridVertexCountX) * gridCellSize;
    const xPos = gridStartPosX + (index % gridVertexCountX) * gridCellSize;

    circle(xPos, yPos, 5, {color: `rgb(${vertex[0]}, ${vertex[1]}, ${vertex[2]})`});
  });

  // Image generation by bilinear interpolation from 2D grid.

  for (let y = 0; y < (imageHeight); y++) {
    for (let x = 0; x < (imageWidth); x++) {
      const gridX = floor(x / gridCellSize);
      const gridY = floor(y / gridCellSize);

      const tx = (x % gridCellSize) / gridCellSize;
      const ty = (y % gridCellSize) / gridCellSize;

      const c00 = grid[gridX + ((gridY+1) * gridVertexCountX)];
      const c10 = grid[gridX + 1 + ((gridY+1) * gridVertexCountX)];
      const c01 = grid[gridX + (gridY * gridVertexCountX)];
      const c11 = grid[gridX + 1 + (gridY * gridVertexCountX)];

      const color = bilerp(c00, c10, c01, c11, tx, ty);

      const xPos = imageStartPosX + x;
      const yPos = imageStartPosY + y;

      circle(xPos, yPos, 1, {color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`});
    }
  };

  console.log('Bilinear interpolation completed.');
}
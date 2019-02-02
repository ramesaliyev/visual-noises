function draw() {
  // context.clearRect(0, 0, screenWidth, screenHeight);

  context.globalAlpha = 0.9;
  context.fillStyle = '#000';
  context.fillRect(0, 0, screenWidth, screenHeight);
  context.globalAlpha = 1;

  const {
    visualisationFn,
    methodFn
  } = getCurrentState();

  visualisationFn({
    getValueFn: (x => methodFn({
      x,
      amplitude,
      frequency,
      offset,
      getRandomFn: () => [ // Always create vector3 to make it easy to use as RGB in colorful visualisations.
        srand(),
        srand(),
        srand()
      ]
    })),
    offsetX: 200,
    offsetY: 0,
    width: screenWidth - 200,
    height: screenHeight
  });

  if (!paused) {
    offsetInput.value = parseFloat(offset.toFixed('10'));
    offset += speed;
  }

  window.requestAnimationFrame(draw);
}

onResize();
draw();
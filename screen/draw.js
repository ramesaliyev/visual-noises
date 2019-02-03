function draw() {
  if (leaveTail) {
    context.globalAlpha = 0.1;
    context.fillStyle = '#000';
    context.fillRect(0, 0, screenWidth, screenHeight);
    context.globalAlpha = 1;
  } else {
    context.clearRect(0, 0, screenWidth, screenHeight);
  }

  const {
    visualisationFn,
    methodFn,
    filterFn
  } = getCurrentState();

  visualisationFn({
    getValueFn: ((x, y=0) => methodFn({
      x,
      y,
      amplitude,
      frequency,
      offset,
      filterFn,
      getRandomFn: () => [ // Always create vector3 to make it easy to use as RGB in colorful visualisations.
        srand(),
        srand(),
        srand()
      ]
    })),
    seed,
    offsetX: 200,
    offsetY: 0,
    width: screenWidth - 200,
    height: screenHeight - 100
  });

  if (!paused) {
    offsetInput.value = parseFloat(offset.toFixed('10'));
    offset += speed;
  }

  if (stopped) console.log('Draw Completed.');
  !stopped && window.requestAnimationFrame(draw);
}

onResize();
draw();
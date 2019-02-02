function draw() {
  context.clearRect(0, 0, screenWidth, screenHeight);

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
    offsetX: 300,
    offsetY: 100,
    width: screenWidth - 400,
    height: screenHeight - 200
  });

  if (!paused) {
    offsetInput.value = parseFloat(offset.toFixed('10'));
    offset += speed;
  }

  window.requestAnimationFrame(draw);
}

onResize();
draw();
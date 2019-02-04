function draw(schedule) {
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
    getValueFn: ((x, y=0) => {
      let noiseSum = [0, 0, 0];
      let _amplitude = amplitude;
      let _frequency = frequency;

      for (let i = 0; i < octave; i++) {
        noiseSum = sum(noiseSum, methodFn({
          x, y, offset, filterFn,
          amplitude:_amplitude, frequency:_frequency,
          getRandomFn: () => [srand(), srand(), srand()]
        }));

        _frequency *= lacunarity;
        _amplitude *= gain;
      }

      return multiply(noiseSum, 1/octave);
    }),
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
  !stopped && schedule && window.requestAnimationFrame(() => draw(true));
}

onResize();
draw(true);
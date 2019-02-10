let drawScheduled = false;

function draw(schedule) {
  if (drawScheduled) {
    return false;
  }

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
    filterFn,
    outputFilterFn,
  } = getCurrentState();

  visualisationFn({
    getValueFn: ((x, y) => {
      let noiseSum = 0;
      let _amplitude = amplitude;
      let _frequency = frequency;

      let xOffset = yOffset = offset;

      if (typeof y === 'undefined' && !syncOffsetsXY) {
        yOffset = 0;
      }

      for (let i = 0; i < octave; i++) {
        noiseSum += methodFn({
          x,
          y,
          xOffset,
          yOffset,
          filterFn,
          outputFilterFn,
          amplitude:_amplitude,
          frequency:_frequency,
          getRandomFn: srand
        });

        _frequency *= lacunarity;
        _amplitude *= gain;
      }

      return noiseSum / octave;
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

  if (!stopped && schedule) {
    drawScheduled = true;

    window.requestAnimationFrame(() => {
      drawScheduled = false;
      draw(true);
    });
  }
}

// Warm up noise algorithms.
ValueNoise2D({});
PerlinNoise2D({});

applySettings(visualisationDefaults['1d-line']);

onResize();
draw(true);
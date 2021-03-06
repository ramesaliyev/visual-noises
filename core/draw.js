let drawScheduled = false;

function scheduleDraw() {
  drawScheduled = true;

  window.requestAnimationFrame(() => {
    drawScheduled = false;
    draw(true);
  });
}

function draw(schedule) {
  if (drawScheduled) {
    return false;
  }

  if (leaveTail) {
    context.globalAlpha = 0.1;
    context.fillStyle = '#000';
    context.fillRect(0, 0, screenWidth, screenHeight);
    context.globalAlpha = 1;
  } else if (clearCanvas) {
    context.clearRect(0, 0, screenWidth, screenHeight);
  }

  const {
    visualisationFn,
    methodFn,
    filterFn,
    outputFilterFn,
  } = getCurrentState();

  const isAsync = visualisationFn({
    getValueFn: ((x = 0, y = 0) => {
      let noiseSum = 0;
      let _amplitude = 0.5;
      let _frequency = frequency;

      let xOffset = yOffset = offset;

      if (!syncOffsetsXY) {
        yOffset = 0;
      }

      let maxValue = 0;

      for (let i = 0; i < octave; i++) {
        const noise = methodFn(
          (x + xOffset) * _frequency,
          (y + yOffset) * _frequency,
          filterFn
        )

        noiseSum += outputFilterFn(noise) * _amplitude;

        maxValue += _amplitude;
        _frequency *= lacunarity;
        _amplitude *= gain;
      }

      return (noiseSum / maxValue) * amplitude;
    }),
    offsetX: 200,
    offsetY: 0,
    width: screenWidth - 200,
    height: screenHeight - 100,
    done: () => !stopped && scheduleDraw()
  });

  if (!paused) {
    offsetInput.value = parseFloat(offset.toFixed('10'));
    offset += speed;
  }

  if (stopped && debugMode) console.log('Draw stopped.');

  clearCanvas = !isAsync;

  if (!stopped && schedule && !isAsync) {
    scheduleDraw();
  }
}

// Initialize seed.
setRandomSeed(seed);

// Warm up noise algorithms.
ValueNoise2D({});
PerlinNoise2D({});

onResize();

applySettings(visualisationDefaults['1d-line']);
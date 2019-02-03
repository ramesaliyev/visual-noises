const visualisationFnsMap = {
  '1d-line': draw1DLine,
  '1d-colorful-line': draw1DColorfulLine,
  '1d-color-gradient': draw1DColorGradient,
  '1d-rgb-lines': draw1DRGBLines,
  '1d-ball': draw1DBall,
  '1d-colorful-ball': draw1DColorfulBall,
  '1d-radius-ball': draw1DRadiusBall,
  '1d-colorful-triangle': draw1DColorfulTriangle,
  '2d-static-image': draw2DStaticImage
};

const methodFnsMap = {
  'value-noise-1d': ValueNoise1D,
  'value-noise-2d': ValueNoise2D,
  'white-noise': WhiteNoise
};

const filterFnsMap = {
  'none': x => x,
  'cosine': cosFilter,
  'smoothstep': smoothStepFilter,
  'fade': fadeFilter,
};

const visualisationDefaults = {
  '2d-static-image': {speed: 0, offset: 0, amplitude: 1.2, frequency: 0.04}
};

const visualisationSelect = document.getElementById('visualisationSelect');
const methodSelect = document.getElementById('methodSelect');
const filterSelect = document.getElementById('filterSelect');
const speedInput = document.getElementById('speedInput');
const offsetInput = document.getElementById('offsetInput');
const frequencyInput = document.getElementById('frequencyInput');
const amplitudeInput = document.getElementById('amplitudeInput');
const drawButton = document.getElementById('drawButton');
const playPauseButton = document.getElementById('playPauseButton');
const resetToDefaultsButton = document.getElementById('resetToDefaultsButton');
const resetOffsetButton = document.getElementById('resetOffsetButton');
const seedInput = document.getElementById('seedInput');
const tailInput = document.getElementById('tailInput');

function resetValues(
  _speed = DEFAULT_SPEED,
  _offset = DEFAULT_OFFSET,
  _amplitude = DEFAULT_AMPLITUDE,
  _frequency = DEFAULT_FREQUENCY
) {
  speed = _speed;
  offset = _offset;
  amplitude = _amplitude;
  frequency = _frequency;
  speedInput.value = speed;
  offsetInput.value = offset;
  frequencyInput.value = frequency;
  amplitudeInput.value = amplitude;
  seedInput.value = seed;
}

resetValues();

function getCurrentState() {
  const dimension = visualisation.split('-')[0];
  const visualisationFn = visualisationFnsMap[visualisation];
  const methodFn = methodFnsMap[method];
  const filterFn = filterFnsMap[filter];

  return {
    visualisationFn,
    methodFn,
    filterFn
  }
}

function on(element, eventName, fn) {
  element.addEventListener(eventName, fn);
}

function pauseOnFocus(element) {
  let prevPaused;
  on(element, 'focus', e => {
    prevPaused = paused;
    paused = true;
  });

  on(element, 'blur', e => {
    paused = prevPaused;
  });
}

function onChange(element, fn) {
  on(element, 'change', e => fn(e.target.value));
}

function onCheck(element, fn) {
  on(element, 'change', e => fn(e.target.checked));
}

function onChangeGetFloat(element, fn) {
  onChange(element, val => fn(parseFloat(val, 10)));
}

function onChangeGetInt(element, fn) {
  onChange(element, val => fn(parseInt(val, 10)));
}

onChange(visualisationSelect, val => {
  visualisation = val;

  const dimension = val.split('-')[0];

  if (dimension === '1d') {
    stopped = false;
    drawButton.disabled = true;
    playPauseButton.disabled = false;
  }

  if (dimension === '2d') {
    stopped = true;
    drawButton.disabled = false;
    playPauseButton.disabled = true;
  }

  const defaults = visualisationDefaults[val];
  if (defaults) {
    resetValues(
      defaults.speed,
      defaults.offset,
      defaults.amplitude,
      defaults.frequency
    );
  }
});

onChange(methodSelect, val => method = val);
onChange(filterSelect, val => filter = val);

onChangeGetFloat(speedInput, val => speed = val);
onChangeGetFloat(offsetInput, val => offset = val);
onChangeGetFloat(frequencyInput, val => frequency = val);
onChangeGetFloat(amplitudeInput, val => amplitude = val);
pauseOnFocus(offsetInput);

onChangeGetInt(seedInput, val => {
  setRandomSeed(val);
  offset = 0;
});

onCheck(tailInput, val => leaveTail = val);

on(drawButton, 'click', () => draw());
on(playPauseButton, 'click', () => {paused = !paused});
on(resetToDefaultsButton, 'click', resetValues);
on(resetOffsetButton, 'click', () => offset = 0);
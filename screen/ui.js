const visualisationFnsMap = {
  '1d-line': draw1DLine,
  '1d-colorful-line': draw1DColorfulLine,
  '1d-color-gradient': draw1DColorGradient,
  '1d-rgb-lines': draw1DRGBLines,
  '1d-ball': draw1DBall,
  '1d-colorful-ball': draw1DColorfulBall,
  '1d-radius-ball': draw1DRadiusBall,
  '1d-colorful-triangle': draw1DColorfulTriangle
};

const methodFnsMap = {
  'value-noise': {
    '1d': ValueNoise1D
  },
  'white-noise': {
    '1d': WhiteNoise,
    '2d': WhiteNoise
  }
};

const filterFnsMap = {
  'none': x => x,
  'cosine': cosFilter,
  'smoothstep': smoothStepFilter,
  'fade': fadeFilter,
};

const visualisationSelect = document.getElementById('visualisationSelect');
const methodSelect = document.getElementById('methodSelect');
const filterSelect = document.getElementById('filterSelect');
const speedInput = document.getElementById('speedInput');
const offsetInput = document.getElementById('offsetInput');
const frequencyInput = document.getElementById('frequencyInput');
const amplitudeInput = document.getElementById('amplitudeInput');
const playPauseButton = document.getElementById('playPauseButton');
const resetToDefaultsButton = document.getElementById('resetToDefaultsButton');
const resetOffsetButton = document.getElementById('resetOffsetButton');
const seedInput = document.getElementById('seedInput');
const tailInput = document.getElementById('tailInput');

function resetValues() {
  speed = DEFAULT_SPEED;
  offset = DEFAULT_OFFSET;
  amplitude = DEFAULT_AMPLITUDE;
  frequency = DEFAULT_FREQUENCY;
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
  const methodFn = methodFnsMap[method][dimension];
  const filterFn = filterFnsMap[filter];

  return {
    visualisationFn,
    methodFn,
    filterFn
  }
}

function pauseOnFocus(element) {
  let prevPaused;
  element.addEventListener('focus', e => {
    prevPaused = paused;
    paused = true;
  });

  element.addEventListener('blur', e => {
    paused = prevPaused;
  });
}

function onChange(element, fn) {
  element.addEventListener('change', e => fn(e.target.value));
}

function onCheck(element, fn) {
  element.addEventListener('change', e => fn(e.target.checked));
}

function onChangeGetFloat(element, fn) {
  onChange(element, val => fn(parseFloat(val, 10)));
}

function onChangeGetInt(element, fn) {
  onChange(element, val => fn(parseInt(val, 10)));
}

onChange(visualisationSelect, val => visualisation = val);
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

playPauseButton.addEventListener('click', () => paused = !paused);
resetToDefaultsButton.addEventListener('click', resetValues);
resetOffsetButton.addEventListener('click', () => offset = 0);
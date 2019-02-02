const visualisationFnsMap = {
  '1d-line': draw1DLine,
  '1d-colorful-line': draw1DColorfulLine
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

const visualisationSelect = document.getElementById('visualisationSelect');
const methodSelect = document.getElementById('methodSelect');
const speedInput = document.getElementById('speedInput');
const offsetInput = document.getElementById('offsetInput');
const frequencyInput = document.getElementById('frequencyInput');
const amplitudeInput = document.getElementById('amplitudeInput');
const playPauseButton = document.getElementById('playPauseButton');
const resetButton = document.getElementById('resetButton');

function resetValues() {
  speed = DEFAULT_SPEED;
  offset = DEFAULT_OFFSET;
  amplitude = DEFAULT_AMPLITUDE;
  frequency = DEFAULT_FREQUENCY;
  speedInput.value = speed;
  offsetInput.value = offset;
  frequencyInput.value = frequency;
  amplitudeInput.value = amplitude;
}

resetValues();

function getCurrentState() {
  const dimension = visualisation.split('-')[0];
  const visualisationFn = visualisationFnsMap[visualisation];
  const methodFn = methodFnsMap[method][dimension];

  return {
    visualisationFn,
    methodFn
  }
}

function pauseOnFocus(element) {
  element.addEventListener('focus', e => {
    paused = true;
  });

  element.addEventListener('blur', e => {
    paused = false;
  });
}

function onChange(element, fn) {
  element.addEventListener('change', e => fn(e.target.value));
}

function onChangeGetFloat(element, fn) {
  onChange(element, val => fn(parseFloat(val, 10)));
}

onChange(visualisationSelect, val => visualisation = val);
onChange(methodSelect, val => method = val);

onChangeGetFloat(speedInput, val => speed = val);
onChangeGetFloat(offsetInput, val => offset = val);
onChangeGetFloat(frequencyInput, val => frequency = val);
onChangeGetFloat(amplitudeInput, val => amplitude = val);

pauseOnFocus(offsetInput);

playPauseButton.addEventListener('click', () => paused = !paused);
resetButton.addEventListener('click', resetValues);
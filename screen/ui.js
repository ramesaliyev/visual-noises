const visualisationSelect = document.getElementById('visualisationSelect');
const methodSelect = document.getElementById('methodSelect');
const filterSelect = document.getElementById('filterSelect');
const outputFilterSelect = document.getElementById('outputFilterSelect');
const speedInput = document.getElementById('speedInput');
const offsetInput = document.getElementById('offsetInput');
const frequencyInput = document.getElementById('frequencyInput');
const amplitudeInput = document.getElementById('amplitudeInput');
const octaveInput = document.getElementById('octaveInput');
const lacunarityInput = document.getElementById('lacunarityInput');
const gainInput = document.getElementById('gainInput');
const drawButton = document.getElementById('drawButton');
const playPauseButton = document.getElementById('playPauseButton');
const resetOffsetButton = document.getElementById('resetOffsetButton');
const seedInput = document.getElementById('seedInput');
const tailInput = document.getElementById('tailInput');

const elements = [
  visualisationSelect,
  methodSelect,
  filterSelect,
  outputFilterSelect,
  speedInput,
  offsetInput,
  frequencyInput,
  amplitudeInput,
  octaveInput,
  lacunarityInput,
  gainInput,
  drawButton,
  playPauseButton,
  resetOffsetButton,
  seedInput,
  tailInput,
];

const visualisationFnsMap = {
  '1d-line': draw1DLine,
  '1d-colorful-line': draw1DColorfulLine,
  '1d-color-gradient': draw1DColorGradient,
  '1d-rgb-lines': draw1DRGBLines,
  '1d-ball': draw1DBall,
  '1d-colorful-ball': draw1DColorfulBall,
  '1d-radius-ball': draw1DRadiusBall,
  '1d-colorful-triangle': draw1DColorfulTriangle,
  '2d-grayscale-image': draw2DGrayscaleImage,
  '2d-colorful-image': draw2DColorfulImage,
  '2d-marble-image': draw2DMarbleImage,
  '2d-colorful-marble-image': draw2DColorfulMarbleImage,
  '2d-wood-image': draw2DWoodImage,
  '2d-colorful-wood-image': draw2DColorfulWoodImage,
};

const methodFnsMap = {
  'value-noise-1d': ValueNoise1D,
  'value-noise-2d': ValueNoise2D,
  'white-noise': WhiteNoise
};

const filterFnsMap = {
  'none': id,
  'cosine': cosFilter,
  'smoothstep': smoothStepFilter,
  'fade': fadeFilter,
};

const outputFilterFnsMap = {
  'none': id,
  'turbulance': turbulenceOFilter,
};

const visualisationDefaults = {
  '1d-line': {speed: 30, offset: 0, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1},
  '1d-colorful-line': {speed: 30, offset: 0, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1},
  '1d-color-gradient': {speed: 30, offset: 0, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1},
  '1d-rgb-lines': {speed: 30, offset: 0, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1},
  '1d-ball': {speed: 30, offset: 0, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1},
  '1d-colorful-ball': {speed: 30, offset: 0, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1},
  '1d-radius-ball': {speed: 30, offset: 0, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1},
  '1d-colorful-triangle': {speed: 30, offset: 0, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1},
  '2d-grayscale-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.02, octave: 5, lacunarity: 2, gain:0.5, disable: [playPauseButton, speedInput]},
  '2d-colorful-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.02, octave: 5, lacunarity: 2, gain:0.5, disable: [playPauseButton, speedInput]},
  '2d-marble-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.02, octave: 5, lacunarity: 2, gain:0.5, disable: [playPauseButton, speedInput]},
  '2d-colorful-marble-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.02, octave: 5, lacunarity: 2, gain:0.5, disable: [playPauseButton, speedInput]},
  '2d-wood-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.008, octave: 1, lacunarity: 1, gain:1, disable: [playPauseButton, speedInput]},
  '2d-colorful-wood-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.008, octave: 1, lacunarity: 1, gain:1, disable: [playPauseButton, speedInput]}
};

function setDefaults(defaults) {
  speedInput.value = speed = (typeof defaults.speed !== undefined ? defaults.speed : speed);
  offsetInput.value = offset = (typeof defaults.offset !== undefined ? defaults.offset : offset);
  frequencyInput.value = frequency = (typeof defaults.frequency !== undefined ? defaults.frequency : frequency);
  amplitudeInput.value = amplitude = (typeof defaults.amplitude !== undefined ? defaults.amplitude : amplitude);
  octaveInput.value = octave = (typeof defaults.octave !== undefined ? defaults.octave : octave);
  lacunarityInput.value = lacunarity = (typeof defaults.lacunarity !== undefined ? defaults.lacunarity : lacunarity);
  gainInput.value = gain = (typeof defaults.gain !== undefined ? defaults.gain : gain);
  seedInput.value = seed;
}

setDefaults(visualisationDefaults['1d-line']);

function getCurrentState() {
  const visualisationFn = visualisationFnsMap[visualisation];
  const methodFn = methodFnsMap[method];
  const filterFn = filterFnsMap[filter];
  const outputFilterFn = outputFilterFnsMap[outputFilter];

  return {
    visualisationFn,
    methodFn,
    filterFn,
    outputFilterFn
  }
}

function on(element, eventName, fn) {
  element.addEventListener(eventName, fn);
}

function pauseOnFocus(element) {
  let prevPaused;
  on(element, 'focus', e => {prevPaused = paused; paused = true});
  on(element, 'blur', e => {paused = prevPaused});
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
  const oldVisualisation = visualisation;
  visualisation = val;

  elements.forEach(element => element.disabled = false);

  const oldDimension = oldVisualisation.split('-')[0];
  const dimension = visualisation.split('-')[0];

  if (dimension === '1d') {
    stopped = false;
    draw(true);
  }

  if (dimension === '2d') {
    stopped = true;
  }

  const defaults = visualisationDefaults[val];

  if (defaults && oldDimension !== dimension) {
    setDefaults(defaults);
  }

  if (defaults && defaults.disable) {
    defaults.disable.forEach(element => element.disabled = true);
  }
});

onChange(methodSelect, val => method = val);
onChange(filterSelect, val => filter = val);
onChange(outputFilterSelect, val => outputFilter = val);

onChangeGetFloat(speedInput, val => speed = val);
onChangeGetFloat(offsetInput, val => offset = val);
onChangeGetFloat(frequencyInput, val => frequency = val);
onChangeGetFloat(amplitudeInput, val => amplitude = val);
onChangeGetFloat(octaveInput, val => octave = val);
onChangeGetFloat(lacunarityInput, val => lacunarity = val);
onChangeGetFloat(gainInput, val => gain = val);
pauseOnFocus(offsetInput);

onChangeGetInt(seedInput, val => {
  setRandomSeed(val);
  offset = 0;
});

onCheck(tailInput, val => leaveTail = val);

on(drawButton, 'click', () => draw(false));
on(playPauseButton, 'click', () => {
  paused = !paused;
  playPauseButton.innerText = paused ? 'Start Auto Draw' : 'Auto Drawing';
  playPauseButton.style.color = paused ? '#e0e0e0' : 'yellowgreen';
});
on(resetOffsetButton, 'click', () => offset = 0);
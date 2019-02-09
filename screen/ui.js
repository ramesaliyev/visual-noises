const presetSelect = document.getElementById('presetSelect');
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

const leaveTailInput = document.getElementById('leaveTailInput');
const applyDefaultsInput = document.getElementById('applyDefaultsInput');
const syncOffsetsInput = document.getElementById('syncOffsetsInput');

const elements = [
  presetSelect,
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
  leaveTailInput,
  applyDefaultsInput,
  syncOffsetsInput
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
  'white-noise': WhiteNoise,
  'value-noise-2d': ValueNoise2D,
  'perlin-noise-2d': PerlinNoise2D,
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
  '1d-line': {speed: 30, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1, method:'value-noise-2d', syncOffsetsXY: false},
  '1d-colorful-line': {speed: 30, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1, method:'value-noise-2d', syncOffsetsXY: false},
  '1d-color-gradient': {speed: 30, amplitude: 500, frequency: 0.0003, octave: 1, lacunarity: 1, gain:1, method:'value-noise-2d', syncOffsetsXY: false},
  '1d-rgb-lines': {speed: 30, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1, method:'value-noise-2d', syncOffsetsXY: false},
  '1d-ball': {speed: 30, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1, method:'value-noise-2d', syncOffsetsXY: false},
  '1d-colorful-ball': {speed: 30, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1, method:'value-noise-2d', syncOffsetsXY: false},
  '1d-radius-ball': {speed: 30, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1, method:'value-noise-2d', syncOffsetsXY: false},
  '1d-colorful-triangle': {speed: 30, amplitude: 500, frequency: 0.001, octave: 1, lacunarity: 1, gain:1, method:'value-noise-2d', syncOffsetsXY: false},
  '2d-grayscale-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.02, octave: 5, lacunarity: 2, gain:0.5, method:'perlin-noise-2d', filter:'fade', disable: [playPauseButton, speedInput], syncOffsetsXY: true},
  '2d-colorful-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.02, octave: 5, lacunarity: 2, gain:0.5, method:'perlin-noise-2d', filter:'fade', disable: [playPauseButton, speedInput], syncOffsetsXY: true},
  '2d-marble-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.02, octave: 5, lacunarity: 2, gain:0.5, method:'perlin-noise-2d', filter:'fade', disable: [playPauseButton, speedInput], syncOffsetsXY: true},
  '2d-colorful-marble-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.02, octave: 5, lacunarity: 2, gain:0.5, method:'perlin-noise-2d', filter:'fade', disable: [playPauseButton, speedInput], syncOffsetsXY: true},
  '2d-wood-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.008, octave: 1, lacunarity: 1, gain:1, method:'perlin-noise-2d', filter:'fade', disable: [playPauseButton, speedInput], syncOffsetsXY: true},
  '2d-colorful-wood-image': {speed: 0, offset: 0, amplitude: 1.8, frequency: 0.008, octave: 1, lacunarity: 1, gain:1, method:'perlin-noise-2d', filter:'fade', disable: [playPauseButton, speedInput], syncOffsetsXY: true}
};

Object.keys(visualisationDefaults).map(key => visualisationDefaults[key].visualisation = key);

const presets = {
  'dancing-mountains': {visualisation: '1d-line', method: 'value-noise-2d', filter: 'smoothstep', outputFilter: 'none', speed: 1, amplitude: 500, frequency: 0.0005, octave: 5, lacunarity: 3, gain:1, syncOffsetsXY:true},
  'rainy-clouds': {visualisation: '2d-grayscale-image', method: 'value-noise-2d', filter: 'smoothstep', outputFilter: 'none', speed: 0, offset: 0, amplitude: 1.8, frequency: 0.002, octave: 5, lacunarity: 2, gain:0.5},
  'dream-clouds': {visualisation: '2d-colorful-image', method: 'value-noise-2d', filter: 'smoothstep', outputFilter: 'none', speed: 0, offset: 0, amplitude: 1.8, frequency: 0.002, octave: 5, lacunarity: 2, gain:0.5},
}

Object.keys(presets).map(key => presets[key].disable = visualisationDefaults[presets[key].visualisation].disable);

function setOption(el, val) {
  el.selectedIndex = [...el.options].find(({value}) => value === val).index;
}

function applySettings(settings) {
  method = first(settings.method, method);
  filter = first(settings.filter, filter);
  outputFilter = first(settings.outputFilter, outputFilter);
  visualisation = first(settings.visualisation, visualisation);
  syncOffsetsXY = first(settings.syncOffsetsXY, syncOffsetsXY);

  if (applyDefaults) {
    speed = first(settings.speed, speed);
    offset = first(settings.offset, offset)
    frequency = first(settings.frequency, frequency)
    amplitude = first(settings.amplitude, amplitude)
    octave = first(settings.octave, octave)
    lacunarity = first(settings.lacunarity, lacunarity)
    gain = first(settings.gain, gain)
  }

  elements.forEach(element => element.disabled = false);
  const dimension = visualisation.split('-')[0];

  if (dimension === '1d') {
    if (stopped) {
      stopped = false;
      draw(true);
    }
    stopped = false;
  }

  if (dimension === '2d') {
    if (stopped) {
      stopped = true;
      draw();
    }
    stopped = true;
  }

  speedInput.value = speed;
  offsetInput.value = offset;
  frequencyInput.value = frequency;
  amplitudeInput.value = amplitude;
  octaveInput.value = octave;
  lacunarityInput.value = lacunarity;
  gainInput.value = gain;
  seedInput.value = seed;
  syncOffsetsInput.checked = syncOffsetsXY;

  setOption(visualisationSelect, visualisation);
  setOption(methodSelect, method);
  setOption(filterSelect, filter);
  setOption(outputFilterSelect, outputFilter);

  (settings.disable || []).forEach(element => element.disabled = true);
}

applySettings(visualisationDefaults['1d-line']);

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
  element.addEventListener(eventName, e => {
    if (element !== presetSelect) {
      setOption(presetSelect, 'none');
    }

    fn(e);
  });
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

onChange(presetSelect, presetName => {
  applySettings(presets[presetName]);
});

onChange(visualisationSelect, val => {
  applySettings(visualisationDefaults[val]);
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

onCheck(leaveTailInput, val => leaveTail = val);
onCheck(applyDefaultsInput, val => applyDefaults = val);
onCheck(syncOffsetsInput, val => syncOffsetsXY = val);

on(drawButton, 'click', () => draw(false));
on(playPauseButton, 'click', () => {
  paused = !paused;
  playPauseButton.innerText = paused ? 'Start Auto Draw' : 'Auto Drawing';
  playPauseButton.style.color = paused ? '#e0e0e0' : 'yellowgreen';
});
on(resetOffsetButton, 'click', () => offset = 0);
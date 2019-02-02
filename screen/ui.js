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

function getCurrentState() {
  const dimension = visualisation.split('-')[0];
  const visualisationFn = visualisationFnsMap[visualisation];
  const methodFn = methodFnsMap[method][dimension];

  return {
    visualisationFn,
    methodFn
  }
}

const visualisationSelect = document.getElementById('visualisationSelect');
const methodSelect = document.getElementById('methodSelect');

visualisationSelect.addEventListener('change', e => {
  visualisation = e.target.value;
});

methodSelect.addEventListener('change', e => {
  method = e.target.value;
});
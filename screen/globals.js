let screenWidth;
let screenHeight;
let mouseX;
let mouseY;

let visualisation = '1d-line';
let method = 'value-noise';

const DEFAULT_OFFSET = 0;
const DEFAULT_AMPLITUDE = 100;
const DEFAULT_FREQUENCY = 0.001;

let offset;
let amplitude;
let frequency;

function resetValues() {
  offset = DEFAULT_OFFSET;
  amplitude = DEFAULT_AMPLITUDE;
  frequency = DEFAULT_FREQUENCY;
}

resetValues();
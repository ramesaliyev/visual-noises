let screenWidth;
let screenHeight;
let mouseX;
let mouseY;

let visualisation = '1d-line';
let method = 'value-noise';
let filter = 'cosine';

const DEFAULT_SPEED = 0.01;
const DEFAULT_OFFSET = 0;
const DEFAULT_AMPLITUDE = 500;
const DEFAULT_FREQUENCY = 0.0005;

let seed = 1549150175619;

let paused = false;
let leaveTail = false;

let speed;
let offset;
let amplitude;
let frequency;
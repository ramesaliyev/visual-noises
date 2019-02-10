let debugMode = false;

let screenWidth;
let screenHeight;
let mouseX;
let mouseY;

let visualisation = '1d-line';
let method = 'value-noise-2d';
let filter = 'smoothstep';
let outputFilter = 'none';

let seed = Date.now();

let stopped = false;
let paused = false;
let leaveTail = false;
let applyDefaults = true;
let syncOffsetsXY = false;
let clearCanvas = true;

let speed;
let offset = 0;
let amplitude;
let frequency;

let octave = 1;
let lacunarity = 1;
let gain = 1;
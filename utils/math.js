/**
 * Builtins
 */
const max = Math.max;
const min = Math.min;
const ceil = Math.ceil;
const floor = Math.floor;
const cos = Math.cos;
const pow = Math.pow;

/**
 * Constants
 */
const PI = Math.PI;
const TWO_PI = PI * 2;

/**
 * Linear Congruential Generator
 */
const LCGMultiplier = 1664525;
const LCGIncrement = 1013904223;
const LCGModulus = pow(2, 32);

let LCGSeed = Date.now();
function setRandomSeed(seed) {
  LCGSeed = seed;
}

function srandInt() {
  return LCGSeed = (LCGMultiplier * LCGSeed + LCGIncrement) % LCGModulus;
}

function srand() {
  return srandInt() / LCGModulus;
}

function srandRange(min, max) {
  return srand() * (max - min) + min;
}

/**
 * Filter methods
 */
function fadeFilter(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function cosFilter(t) {
  return (1 - cos(t * PI)) * 0.5;
}

function smoothStepFilter(t) {
  return t * t * (3 - 2 * t);
}

/**
 * Vectors
 */
function vectorize(a, b) {
  a = typeof a === 'number' ? [a] : a;
  b = typeof b === 'number' ? new Array(a.length).fill(b) : b;

  return [a, b];
}

function multiply(a, b) {
  [a, b] = vectorize(a, b);
  return a.map((v, i) => v * b[i]);
}

function sum(a, b) {
  [a, b] = vectorize(a, b);
  return a.map((v, i) => v + b[i]);
}

/**
 * Interpolation
 */
function lerp(a, b, t) {
  return sum(
    multiply(a, (1 - t)),
    multiply(b, t)
  );
}

function bilerp(c00, c10, c01, c11, tx, ty) {
  return lerp(
    lerp(c01, c11, tx),
    lerp(c00, c10, tx),
    ty
  );
}

/**
 * Map number n which between the range a..b to another range x..y
 */
function map(currFrom, currTo, targetFrom, targetTo, n) {
  return ((n - currFrom) / (currTo - currFrom) * (targetTo - targetFrom)) + targetFrom;
}

/**
 * Constrain number between min max.
 */
function constrain(low, high, n) {
  return max(min(n, high), low);
}
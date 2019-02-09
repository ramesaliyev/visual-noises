/**
 * Builtins
 */
const max = Math.max;
const min = Math.min;
const ceil = Math.ceil;
const floor = Math.floor;
const round = Math.round;
const cos = Math.cos;
const pow = Math.pow;
const abs = Math.abs;
const sin = Math.sin;

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

function srandRangeInt(min, max) {
  return round(srandRange(min,max));
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
 * Output filter methods.
 */
function turbulenceOFilter(t) {
  return abs((2 * t) - 1);
}

/**
 * Interpolation
 */
function lerp(a, b, t) {
  return a*(1-t) + b*t;
}

function bilerp(c00, c10, c01, c11, tx, ty) {
  return lerp(
    lerp(c00, c10, tx),
    lerp(c01, c11, tx),
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
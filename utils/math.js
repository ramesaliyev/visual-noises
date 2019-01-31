const max = Math.max;
const min = Math.min;
const ceil = Math.ceil;
const floor = Math.floor;
const random = Math.random;

const TWO_PI = Math.PI * 2;

function randomRange(min, max) {
  return random() * (max - min) + min;
}

function fade(t) {
  return t*t*t*(t*(t*6-15)+10);
}

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

function lerp(a, b, t) {
  return sum(
    multiply(a, (1 - t)),
    multiply(b, t)
  );
}

function bilerp(tx, ty, c00, c10, c01, c11) {
  return lerp(
    lerp(c01, c11, tx),
    lerp(c00, c10, tx),
    ty
  );
}
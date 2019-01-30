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

function lerp(a, b, t) {
  return a*(1 - t) + b*t;
}

function bilerp(tx, ty, c00, c10, c01, c11) {
  return lerp(
    lerp(c00, c10, tx),
    lerp(c01, c11, tx),
    ty
  );
}
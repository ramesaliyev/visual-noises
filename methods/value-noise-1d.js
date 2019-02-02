const DEFAULT_MAX_VERTICES = 256;

const randomsBySeed = {};

function ValueNoise1D({
  maxVertices = DEFAULT_MAX_VERTICES,
  getRandomFn = srand,
  filterFn = cosFilter,
  frequency = 1,
  amplitude = 1,
  offset = 0,
  log = false,
  seed,
  x: value, // only required value
}) {
  const maxVerticesMask = maxVertices - 1;

  if (seed) {
    setRandomSeed(seed);
  }

  let randoms = randomsBySeed[seed];

  if (!randoms) {
    randomsBySeed[seed] = randoms = [];

    for (let i = 0; i < maxVertices; i++) {
      randoms[i] = getRandomFn();
    }
  }

  // Floor
  const x = (value * frequency) + offset;
  const xInt = floor(x) - (x < 0 && x !== floor(x));
  const tx = x - xInt;

  // Modulo using &
  const xMin = xInt & maxVerticesMask;
  const xMax = (xMin + 1) & maxVerticesMask;

  // Get vertices.
  const leftVertex = randoms[xMin];
  const rightVertex = randoms[xMax];

  if (log) {
    console.log({
      value, x, xInt, tx, xMin, xMax,
      leftVertex, rightVertex
    });
  }

  return multiply(
    lerp(leftVertex, rightVertex, filterFn(tx)),
    amplitude
  );
}
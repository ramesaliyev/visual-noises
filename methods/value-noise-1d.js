const VALUE_NOISE_1D_DEFAULT_MAX_VERTICES = 256;
const ValueNoise1DRandomsBySeed = {};

function ValueNoise1D({
  getRandomFn = srand,
  maxVertices = VALUE_NOISE_1D_DEFAULT_MAX_VERTICES,
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

  let randoms = ValueNoise1DRandomsBySeed[seed];

  if (!randoms) {
    ValueNoise1DRandomsBySeed[seed] = randoms = [];

    for (let i = 0; i < maxVertices; i++) {
      randoms[i] = getRandomFn();
    }
  }

  // Floor
  const x = (value * frequency) + offset;
  const xInt = floor(x);
  const tx = x - xInt;

  // Modulo using &
  const leftVertexIndex = xInt & maxVerticesMask;
  const rightVertexIndex = (leftVertexIndex + 1) & maxVerticesMask;

  // Get vertices.
  const leftVertexValue = randoms[leftVertexIndex];
  const rightVertexValue = randoms[rightVertexIndex];

  if (log) {
    console.log({
      value, x, xInt, tx,
      leftVertexIndex, rightVertexIndex,
      leftVertexValue, rightVertexValue
    });
  }

  return multiply(
    lerp(leftVertexValue, rightVertexValue, filterFn(tx)),
    amplitude
  );
}
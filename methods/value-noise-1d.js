const VALUE_NOISE_1D_DEFAULT_MAX_VERTICES = 256;
const VALUE_NOISE_1D_DEFAULT_MAX_VERTICES_MASK = VALUE_NOISE_1D_DEFAULT_MAX_VERTICES - 1;
const ValueNoise1DRandomsBySeed = {};

function ValueNoise1D({
  getRandomFn = srand,
  filterFn = cosFilter,
  frequency = 1,
  amplitude = 1,
  offset = 0,
  seed,
  x: value, // only required value
}) {
  const maxVertices = VALUE_NOISE_1D_DEFAULT_MAX_VERTICES;
  const maxVerticesMask = VALUE_NOISE_1D_DEFAULT_MAX_VERTICES_MASK;

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

  return multiply(
    lerp(leftVertexValue, rightVertexValue, filterFn(tx)),
    amplitude
  );
}
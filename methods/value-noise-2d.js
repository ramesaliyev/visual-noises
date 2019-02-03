const VALUE_NOISE_2D_DEFAULT_MAX_VERTICES = 256;

const ValueNoise2DRandomsBySeed = {};

function ValueNoise2D({
  maxVertices = VALUE_NOISE_2D_DEFAULT_MAX_VERTICES,
  getRandomFn = srand,
  filterFn = cosFilter,
  frequency = 1,
  amplitude = 1,
  offset = 0,
  seed,
  x: valueX, // required value
  y: valueY, // required value
}) {
  const maxVerticesMask = maxVertices - 1;

  if (seed) {
    setRandomSeed(seed);
  }

  let randoms = ValueNoise2DRandomsBySeed[seed];

  if (!randoms) {
    ValueNoise2DRandomsBySeed[seed] = randoms = [];

    const length = maxVertices * maxVertices;
    for (let i = 0; i < length ; i++) {
      randoms[i] = getRandomFn();
    }
  }

  // Floor
  const x = (valueX * frequency) + offset;
  const y = (valueY * frequency) + offset;
  const xInt = floor(x);
  const yInt = floor(y);
  const tx = x - xInt;
  const ty = y - yInt;

  // Modulo using &
  const leftVertexIndex = xInt & maxVerticesMask;
  const rightVertexIndex = (leftVertexIndex + 1) & maxVerticesMask;
  const bottomVertexIndex = yInt & maxVerticesMask;
  const topVertexIndex = (bottomVertexIndex + 1) & maxVerticesMask;

  // Get vertices.
  const c00 = randoms[bottomVertexIndex * maxVerticesMask + leftVertexIndex];
  const c10 = randoms[bottomVertexIndex * maxVerticesMask + rightVertexIndex];
  const c01 = randoms[topVertexIndex * maxVerticesMask + leftVertexIndex];
  const c11 = randoms[topVertexIndex * maxVerticesMask + rightVertexIndex];

  // Retun bilinear interpolation.
  return multiply(
    bilerp(c00, c10, c01, c11, filterFn(tx), filterFn(ty)),
    amplitude
  );
}
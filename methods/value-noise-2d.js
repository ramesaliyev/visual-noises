const VALUE_NOISE_2D_DEFAULT_MAX_VERTICES = 256;
const VALUE_NOISE_2D_DEFAULT_MAX_VERTICES_MASK = VALUE_NOISE_2D_DEFAULT_MAX_VERTICES - 1;

const ValueNoise2DRandomsBySeed = {};

let ValueNoise2DPermutationTable = [];

for (let i = 0; i < VALUE_NOISE_2D_DEFAULT_MAX_VERTICES ; i++) {
  const table = ValueNoise2DPermutationTable;
  const randomIndex = srandInt() & VALUE_NOISE_2D_DEFAULT_MAX_VERTICES_MASK;

  const valueAtRandomIndex = table[randomIndex] || randomIndex;
  const valueAtIndex = table[i] || i;

  table[i] = valueAtRandomIndex
  table[randomIndex] = valueAtIndex;
}

ValueNoise2DPermutationTable = [
  ...ValueNoise2DPermutationTable,
  ...ValueNoise2DPermutationTable
];

function ValueNoise2D({
  getRandomFn = srand,
  filterFn = cosFilter,
  frequency = 1,
  amplitude = 1,
  offset = 0,
  seed,
  x: valueX, // required value
  y: valueY, // required value
}) {
  const maxVertices = VALUE_NOISE_2D_DEFAULT_MAX_VERTICES;
  const maxVerticesMask = VALUE_NOISE_2D_DEFAULT_MAX_VERTICES_MASK;
  const permutationTable = ValueNoise2DPermutationTable;

  if (seed) {
    setRandomSeed(seed);
  }

  let randoms = ValueNoise2DRandomsBySeed[seed];

  if (!randoms) {
    ValueNoise2DRandomsBySeed[seed] = randoms = [];

    const length = maxVertices;
    for (let i = 0; i < length ; i++) {
      randoms[i] = getRandomFn();
    }
  }

  // Floor
  const x = (valueX + offset) * frequency;
  const y = (valueY + offset) * frequency;
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
  const c00 = randoms[permutationTable[permutationTable[leftVertexIndex] + bottomVertexIndex]];
  const c10 = randoms[permutationTable[permutationTable[rightVertexIndex] + bottomVertexIndex]];
  const c01 = randoms[permutationTable[permutationTable[leftVertexIndex] + topVertexIndex]];
  const c11 = randoms[permutationTable[permutationTable[rightVertexIndex] + topVertexIndex]];

  // Retun bilinear interpolation.
  return multiply(
    bilerp(c00, c10, c01, c11, filterFn(tx), filterFn(ty)),
    amplitude
  );
}
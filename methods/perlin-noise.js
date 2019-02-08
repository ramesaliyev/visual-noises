const PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES = 256;
const PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES_MASK = PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES - 1;
const PERLIN_NOISE_2D_GRAD_DIRECTIONS = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [0, 1], [0, -1]];

const PerlinNoise2DGradientBase =
  new Array(PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES)
    .fill(PERLIN_NOISE_2D_GRAD_DIRECTIONS)
    .flat()
    .slice(0, PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES);

const PerlinNoise2DGradientsBySeed = {};
let PerlinNoise2DPermutationTable = [];

PerlinNoise2DPermutationTable = [
  151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,
  99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,
  11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,
  139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,
  245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,
  196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
  202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,
  170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,
  98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,
  144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,
  184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,
  141,128,195,78,66,215,61,156,180
];

PerlinNoise2DPermutationTable = [
  ...PerlinNoise2DPermutationTable,
  ...PerlinNoise2DPermutationTable
];

function PerlinNoise2D({
  getRandomFn = srand,
  filterFn = cosFilter,
  outputFilterFn = id,
  frequency = 1,
  amplitude = 1,
  offset = 0,
  seed,
  x: valueX, // required value
  y: valueY, // required value
}) {
  const maxVertices = PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES;
  const maxVerticesMask = PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES_MASK;
  const pTable = PerlinNoise2DPermutationTable;

  if (seed) {
    setRandomSeed(seed);
  }

  let gTable = PerlinNoise2DGradientsBySeed[seed];

  if (!gTable) {
    const randoms = new Array(maxVertices).fill(0).map(getRandomFn);
    const table = randoms.map(randVec => {
      return mapVec(randVec, val => {
        val = floor(map(0, 1, 0, maxVerticesMask, val));
        return PerlinNoise2DGradientBase[pTable[val]];
      });
    });

    PerlinNoise2DGradientsBySeed[seed] = gTable = [
      ...table,
      ...table
    ];
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
  const g00 = gTable[pTable[pTable[leftVertexIndex] + bottomVertexIndex] & maxVerticesMask];
  const g10 = gTable[pTable[pTable[rightVertexIndex] + bottomVertexIndex] & maxVerticesMask];
  const g01 = gTable[pTable[pTable[leftVertexIndex] + topVertexIndex] & maxVerticesMask];
  const g11 = gTable[pTable[pTable[rightVertexIndex] + topVertexIndex] & maxVerticesMask];

  const c00 = mapVec(g00, val => dotProd(val, [tx, ty]));
  const c10 = mapVec(g10, val => dotProd(val, [tx-1, ty]));
  const c01 = mapVec(g01, val => dotProd(val, [tx, ty-1]));
  const c11 = mapVec(g11, val => dotProd(val, [tx-1, ty-1]));

  // Retun bilinear interpolation.
  return multiply(
    map(-1, 1, 0, 1, outputFilterFn(
      bilerp(c00, c10, c01, c11, filterFn(tx), filterFn(ty))
    )),
    amplitude
  );
}
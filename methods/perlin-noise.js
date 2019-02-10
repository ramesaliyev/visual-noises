const PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES = 256;
const PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES_MASK = PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES - 1;

let PerlinNoise2DPermutationTableBase = [
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

const PerlinNoise2DPermutationTableBySeed = {};

function getPerlinNoise2dPermutationTableBySeed(seed) {
  let pTable = PerlinNoise2DPermutationTableBySeed[seed];

  if (!pTable) {
    const table = [...PerlinNoise2DPermutationTableBase];

    for (let i = 0; i < PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES ; i++) {
      const randomIndex = ceil(srand() * 255);
      [table[i], table[randomIndex]] = [table[randomIndex], table[i]];
    }

    pTable = PerlinNoise2DPermutationTableBySeed[seed] = [
      ...table,
      ...table
    ];
  }

  return pTable;
}

function Perlin2DGradientDotProd(i, x, y) {
  switch (i & 15) {
    case 0:  return x + y; // [1, 1],
    case 1:  return -x + y; // [-1, 1],
    case 2:  return x -y; // [1, -1],
    case 3:  return -x -y; // [-1, -1],
    case 4:  return x; // [1, 0],
    case 5:  return -x; // [-1, 0],
    case 6:  return x; // [1, 0],
    case 7:  return -x; // [-1, 0],
    case 8:  return y; // [0, 1],
    case 9:  return -y; // [0, -1],
    case 10: return y; // [0, 1],
    case 11: return -y; // [0, -1],
    case 12: return x + y; // [1, 1],
    case 13: return -x + y; // [-1, 1],
    case 14: return x -y; // [1, -1],
    case 15: return -x -y; // [-1, -1]
  }
}

function PerlinNoise2D({
  filterFn = cosFilter,
  outputFilterFn = id,
  frequency = 1,
  amplitude = 1,
  xOffset = 0,
  yOffset = 0,
  x: valueX = 0, // required value
  y: valueY = 0, // required value
}) {
  const maxVerticesMask = PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES_MASK;
  const pTable = getPerlinNoise2dPermutationTableBySeed(seed);

  // Floor
  const x = (valueX + xOffset) * frequency;
  const y = (valueY + yOffset) * frequency;
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
  const g00 = pTable[pTable[leftVertexIndex] + bottomVertexIndex];
  const g10 = pTable[pTable[rightVertexIndex] + bottomVertexIndex];
  const g01 = pTable[pTable[leftVertexIndex] + topVertexIndex];
  const g11 = pTable[pTable[rightVertexIndex] + topVertexIndex];

  const c00 = Perlin2DGradientDotProd(g00, tx, ty);
  const c10 = Perlin2DGradientDotProd(g10, tx-1, ty);
  const c01 = Perlin2DGradientDotProd(g01, tx, ty-1);
  const c11 = Perlin2DGradientDotProd(g11, tx-1, ty-1);

  // Retun bilinear interpolation.
  return outputFilterFn(
    map(-1, 1, 0, 1, bilerp(c00, c10, c01, c11, filterFn(tx), filterFn(ty)))
  ) * amplitude;
}
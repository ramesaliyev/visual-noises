function run(fn, globals, done) {
  const now = debugMode ? performance.now() : 0;
  const worker = new Worker(URL.createObjectURL(new Blob([`
    // Utils
    const PI = Math.PI;
    const TWO_PI = PI * 2;
    const max = Math.max;
    const min = Math.min;
    const ceil = Math.ceil;
    const floor = Math.floor;
    const round = Math.round;
    const cos = Math.cos;
    const pow = Math.pow;
    const abs = Math.abs;
    const sin = Math.sin;
    const LCGMultiplier = ${LCGMultiplier};
    const LCGIncrement = ${LCGIncrement};
    const LCGModulus = ${LCGModulus};
    let LCGSeed = ${LCGSeed};
    ${setRandomSeed};
    ${srandInt};
    ${srand};
    ${srandRange};
    ${fadeFilter};
    ${cosFilter};
    ${smoothStepFilter};
    ${turbulenceOFilter};
    ${lerp};
    ${bilerp};
    ${map};
    ${constrain};
    ${id};
    ${first};
    ${flat};

    // Globals
    let speed = ${speed};
    let offset = ${offset};
    let amplitude = ${amplitude};
    let frequency = ${frequency};
    let octave = ${octave};
    let lacunarity = ${lacunarity};
    let gain = ${gain};
    let seed = ${seed};

    // Value Noise 2D
    const VALUE_NOISE_2D_DEFAULT_MAX_VERTICES = ${VALUE_NOISE_2D_DEFAULT_MAX_VERTICES};
    const VALUE_NOISE_2D_DEFAULT_MAX_VERTICES_MASK = ${VALUE_NOISE_2D_DEFAULT_MAX_VERTICES_MASK};
    const ValueNoise2DPermutationTable = ${JSON.stringify(ValueNoise2DPermutationTable)};
    const ValueNoise2DRandomsBySeed = ${JSON.stringify(ValueNoise2DRandomsBySeed)};
    ${ValueNoise2D};

    // Perlin Noise 2D
    const PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES = ${PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES};
    const PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES_MASK = ${PERLIN_NOISE_2D_DEFAULT_MAX_VERTICES_MASK};
    let PerlinNoise2DPermutationTableBase = ${JSON.stringify(PerlinNoise2DPermutationTableBase)};
    let PerlinNoise2DPermutationTableBySeed = ${JSON.stringify(PerlinNoise2DPermutationTableBySeed)};
    ${getPerlinNoise2dPermutationTableBySeed};
    ${Perlin2DGradientDotProd};
    ${PerlinNoise2D};

    // State
    const visualisationFn = ${getCurrentState().visualisationFn};
    const methodFn = ${getCurrentState().methodFn};
    const filterFn = ${getCurrentState().filterFn};
    const outputFilterFn = ${getCurrentState().outputFilterFn};

    // Initialize
    setRandomSeed(seed);

    // Supplied Globals
    ${Object.keys(globals).map(name => `const ${name} = ${globals[name]};`).join('\n')}

    // Run fn.
    postMessage((${fn})());
  `])));
  debugMode && console.log(`Worker prepared, took ${performance.now() - now}ms.`);

  worker.onmessage = ({data}) => {
    debugMode && console.log(`Worker job completed, took ${performance.now() - now}ms.`);
    worker.terminate();
    done(data);
  };
}
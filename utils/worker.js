function run(fn, globals, done) {
  const worker = new Worker(URL.createObjectURL(new Blob([`
    // Utils
    const max = Math.max;
    const min = Math.min;
    const ceil = Math.ceil;
    const floor = Math.floor;
    const cos = Math.cos;
    const pow = Math.pow;
    const abs = Math.abs;
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
    ${vec};
    ${vectorize};
    ${mapVec2};
    ${multiply};
    ${sum};
    ${lerp};
    ${bilerp};
    ${map};
    ${constrain};
    ${id};

    // Globals
    let speed = ${speed};
    let offset = ${offset};
    let amplitude = ${amplitude};
    let frequency = ${frequency};
    let octave = ${octave};
    let lacunarity = ${lacunarity};
    let gain = ${gain};

    // Value Noise 1D
    const VALUE_NOISE_1D_DEFAULT_MAX_VERTICES = ${VALUE_NOISE_1D_DEFAULT_MAX_VERTICES};
    const VALUE_NOISE_1D_DEFAULT_MAX_VERTICES_MASK = ${VALUE_NOISE_1D_DEFAULT_MAX_VERTICES_MASK};
    const ValueNoise1DRandomsBySeed = ${JSON.stringify(ValueNoise1DRandomsBySeed)};
    ${ValueNoise1D};

    // Value Noise 2D
    const VALUE_NOISE_2D_DEFAULT_MAX_VERTICES = ${VALUE_NOISE_2D_DEFAULT_MAX_VERTICES};
    const VALUE_NOISE_2D_DEFAULT_MAX_VERTICES_MASK = ${VALUE_NOISE_2D_DEFAULT_MAX_VERTICES_MASK};
    const ValueNoise2DPermutationTable = ${JSON.stringify(ValueNoise2DPermutationTable)};
    const ValueNoise2DRandomsBySeed = ${JSON.stringify(ValueNoise2DRandomsBySeed)};
    ${ValueNoise2D};

    // State
    const visualisationFn = ${getCurrentState().visualisationFn};
    const methodFn = ${getCurrentState().methodFn};
    const filterFn = ${getCurrentState().filterFn};
    const outputFilterFn = ${getCurrentState().outputFilterFn};

    // Supplied Globals
    ${Object.keys(globals).map(name => `const ${name} = ${globals[name]};`).join('\n')}

    // Run fn.
    postMessage((${fn})());
  `])));

  worker.onmessage = ({data}) => done(data);

  return worker;
}
function run(fn, globals, done) {
  const worker = new Worker(URL.createObjectURL(new Blob([`
    // Utils
    const max = Math.max;
    const min = Math.min;
    const ceil = Math.ceil;
    const floor = Math.floor;
    const cos = Math.cos;
    const pow = Math.pow;
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
    ${vectorize};
    ${multiply};
    ${sum};
    ${lerp};
    ${bilerp};
    ${map};
    ${constrain};

    // Globals
    let speed = ${speed};
    let offset = ${offset};
    let amplitude = ${amplitude};
    let frequency = ${frequency};

    // Value Noise 1D
    const VALUE_NOISE_1D_DEFAULT_MAX_VERTICES = ${VALUE_NOISE_1D_DEFAULT_MAX_VERTICES};
    const ValueNoise1DRandomsBySeed = ${JSON.stringify(ValueNoise1DRandomsBySeed)};
    ${ValueNoise1D};

    // Value Noise 2D
    const VALUE_NOISE_2D_DEFAULT_MAX_VERTICES = ${VALUE_NOISE_2D_DEFAULT_MAX_VERTICES};
    const ValueNoise2DRandomsBySeed = ${JSON.stringify(ValueNoise2DRandomsBySeed)};
    ${ValueNoise2D};

    // State
    const visualisationFn = ${getCurrentState().visualisationFn};
    const methodFn = ${getCurrentState().methodFn};
    const filterFn = ${getCurrentState().filterFn};

    // Supplied Globals
    ${Object.keys(globals).map(name => `const ${name} = ${globals[name]};`).join('\n')}

    // Run fn.
    postMessage((${fn})());
  `])));

  worker.onmessage = ({data}) => done(data);

  return worker;
}
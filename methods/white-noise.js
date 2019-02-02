function WhiteNoise({
  getRandomFn = srand,
  amplitude = 1,
  seed
}) {
  if (seed) {
    setRandomSeed(seed);
  }

  return multiply(getRandomFn(), amplitude);
}
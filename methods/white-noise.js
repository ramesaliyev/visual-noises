function WhiteNoise({
  getRandomFn = srand,
  amplitude = 1,
}) {
  return getRandomFn() * amplitude;
}
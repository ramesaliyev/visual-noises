function id(t) {
  return t;
}

function first(...args) {
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
  }
}

function flat(arr) {
  return arr.flat ? arr.flat() : arr.reduce((a, b) => a.concat(b), []);
}
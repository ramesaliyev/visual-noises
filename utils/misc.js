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
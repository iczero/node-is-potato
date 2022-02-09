module.exports = function isPotato(obj) {
  try {
  if (typeof obj !== 'object') return false;
  else {
    // check inheritance
    let constructor = obj?.constructor;
    while (typeof constructor === 'function') {
      if (constructor.name.toLowerCase() === 'potato') return true;
      constructor = Object.getPrototypeOf(constructor);
    }
    return false;
  }
  } catch (err) {
    return false;
  }
};

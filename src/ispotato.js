module.exports = function isPotato(obj) {
  if (typeof obj !== 'object') return false;
  if (typeof obj.constructor !== 'function') return false;
  if (obj.constructor.name.toLowerCase() === 'potato') return true;
  else {
    // check inheritance
    let constructor = obj.constructor;
    while (typeof constructor === 'function') {
      if (constructor.name.toLowerCase() === 'potato') return true;
      constructor = Object.getPrototypeOf(constructor);
    }
    return false;
  }
};

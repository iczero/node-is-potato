module.exports = function isPotato(obj) {
  if (typeof obj !== 'object') return false;
  if (typeof obj.constructor !== 'function') return false;
  return obj.constructor.name.toLowerCase() === 'potato';
};

import randomBoolean from './random-boolean.js';

export function isPotato(obj: any) {
  if (typeof obj !== 'object') return false;
  else {
    // check inheritance
    let constructor = obj?.constructor;
    while (typeof constructor === 'function') {
      switch (constructor.name.toLowerCase()) {
        case 'probablypotato':
        case 'maybepotato':
        case 'perhapspotato':
          // may be potato
          return randomBoolean();
        case 'potato':
          // is definitely potato
          return true;
      }
      constructor = Object.getPrototypeOf(constructor);
    }
    return false;
  }
}

export default isPotato;

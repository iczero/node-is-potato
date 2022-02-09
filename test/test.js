const assert = require('chai').assert;
const isPotato = require('..');

describe('is-potato', () => {
  it('should correctly identify potatoes', () => {
    /** A class representing a potato */
    class Potato {}
    // construct a new potato
    let potato = new Potato();
    // should return true
    assert.isTrue(isPotato(potato));
  });
  it('should correctly identify things that are technically potatoes', () => {
    /** A class representing a potato */
    class Potato {}
    /** A class representing a thing */
    class Thing extends Potato {}
    // a thing that is technically a potato
    let thing = new Thing();
    assert.isTrue(isPotato(thing));
  });
  it('should correctly identify non-potatoes', () => {
    // distinctly not a potato
    assert.isFalse(isPotato(5));
  });
  it('should correctly identify things that are definitely not potatoes', () => {
    /** Not a potato */
    class NotPotato {}
    // a thing that is not a potato
    let notPotato = new NotPotato();
    assert.isFalse(isPotato(notPotato));
  });
  it('should not choke on null or undefined', () => {
    assert.isFalse(isPotato(null));
    assert.isFalse(isPotato(undefined));
  });
});

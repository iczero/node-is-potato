import { keccakRand } from './keccak-provider.js';

export default function randomBoolean() {
  return keccakRand.bool();
}


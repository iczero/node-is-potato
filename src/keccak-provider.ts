import { randomBytes } from 'crypto';
import fsP from 'fs/promises';
import _debug from 'debug';
import { Keccak, KeccakRand } from './keccak.js';
const debug = _debug('is-potato:keccak');

const KECCAK_BITRATE = 512;
export let keccak = new Keccak(12);
export let keccakRand = new KeccakRand(keccak, KECCAK_BITRATE);
export let randomFd: fsP.FileHandle | null = null;
export let randomTimer: NodeJS.Timeout | null = null;

export async function randomStuff(initial = false) {
  let time1 = process.hrtime()[1];
  let readLength = keccakRand.byterate;
  if (initial) readLength *= 8;
  let readBuf = Buffer.allocUnsafe(readLength);
  let writeBuf = keccakRand.bytesDirect(keccakRand.byterate);
  await Promise.all([
    randomFd!.read(readBuf, 0, readBuf.length, null),
    initial ? null : randomFd!.write(writeBuf)
  ]);
  keccakRand.seedDirect(readBuf);
  let timeBuf = keccakRand.bytes(2);
  let time = timeBuf.readUInt16BE();
  let time2 = process.hrtime()[1];
  if (time2 < time1) time2 += 1e9;
  let writeTimeBuf = Buffer.alloc(4);
  writeTimeBuf.writeUInt32LE(time2 - time1);
  keccakRand.write(writeTimeBuf);
  randomTimer = setTimeout(randomStuff, time * 10);
  randomTimer.unref();
  debug('periodic resync, tdelta', time2 - time1, 'scheduled', time * 10);
}

try {
  // attempt open random device, will only work on linux
  randomFd = await fsP.open('/dev/urandom', 'r+');
  await randomStuff(true);
  debug('seeded from /dev/urandom');
} catch (err) {
  // seed with crypto.randomBytes instead
  keccakRand.seedDirect(randomBytes(keccakRand.byterate * 16));
  debug('seeded from crypto.randomBytes');
}

// MWAHAHAHAHAHAHAHAHAHA
// @ts-ignore
Math._random = Math.random;
Math.random = keccakRand.float.bind(keccakRand);

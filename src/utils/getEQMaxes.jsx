import { maxComposed } from '../references/maxComposed';

export const getEQMaxes = (inLookup, eq) =>
  maxComposed[`eq${eq}`][inLookup[eq - 1]];

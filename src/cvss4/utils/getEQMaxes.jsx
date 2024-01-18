import { maxComposed } from '../references/maxComposed';

export const getEQMaxes = (lookup, eq) =>
  maxComposed[`eq${eq}`][lookup[eq - 1]];

import { BYTES_IN_MEGABYTE } from './libs/constants.js';

const getMegabytesFromBytes = (bytes: number): number => {
  return Math.floor(bytes / BYTES_IN_MEGABYTE);
};
export { getMegabytesFromBytes };

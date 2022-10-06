import { bells } from '../data/index.js';

export const sendBells = (reply) => {
  const values = Object.values(bells);
  reply(values.join('\n'));
};
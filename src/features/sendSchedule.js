import { getSchedule } from '../api/index.js';

export const sendSchedule = async (msg, reply) => {
  const splitted = msg.split(' ');

  if (splitted.length !== 2) {
    reply('Something went wrong');
  } else {
    const group = splitted[1];
    reply(await getSchedule(group));
  }
};
import { getTeacherSchedule } from '../api/index.js';

export const sendTeacherSchedule = async (msg, reply) => {
  const splitted = msg.split(' ');

  if (splitted.length !== 2) {
    reply('Something went wrong');
  } else {
    const teacher = splitted[1];
    reply(await getTeacherSchedule(teacher));
  }
}
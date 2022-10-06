import axios from 'axios';
import { groups, letters } from '../data/index.js';
import { decoder, formatter } from '../utils/index.js';

export const getSchedule = async (group) => {
  const currentGroup = groups[group];
  const { data } = await axios.request({
    url: `http://rasp.salinc.ru/r.php?cmd=g&g=${currentGroup}`,
    method: 'GET',
    responseType: 'arraybuffer',
  });
  const decodedData = decoder(data);
  return formatter(decodedData);
};

export const getTeacherSchedule = async (teacher) => {
  const formattedTeacher = teacher.slice(1).toLowerCase();
  const letter = letters[teacher[0]];
  if (letter === undefined) {
    return `Учитель не найден!`;
  }
  const { data } = await axios.request({
    url: `http://rasp.salinc.ru/rp.php?cmd=g&g=${letter}`,
    method: 'GET',
    responseType: 'arraybuffer',
  });
  const decodedData = decoder(data);
  const formatted = formatter(decodedData);
  const splitted = formatted.split('\n');
  const teacherSchedule = [];
  for (let i = 0; i < splitted.length; i++) {
    const elem = splitted[i];
    const isFirstSymbolNumber = Number.isNaN(Number(elem[0]));
    if (elem.includes(formattedTeacher) && isFirstSymbolNumber) {
      const teacherEndIndex = splitted.indexOf('', i);
      const schedule = splitted.slice(i, teacherEndIndex).join('\n');
      teacherSchedule.push(schedule);
    }
  }
  const filtered = teacherSchedule.filter((str) => str);
  if (filtered.length === 0) {
    return 'Учитель не найден!'
  }
  return filtered
    .join('\n\n');
}
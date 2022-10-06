import { Bot } from "grammy";
import { sendBells, sendSchedule, sendTeacherSchedule } from './features/index.js';

export const bot = new Bot(process.env.BOT_TOKEN);

bot.on('message', async (ctx) => {
  const { text } = ctx.message;
  const reply = (str) => {
    ctx.reply(str);
  }
  
  if (text === undefined) {
    return;
  }
  const textLower = text.toLowerCase();
  if (textLower.startsWith('преп ')) {
    sendTeacherSchedule(textLower, reply);
  } else if (textLower.startsWith('расп ')) {
    sendSchedule(textLower, reply);
  } else if (textLower === 'звонки') {
    sendBells(reply);
  }
});

bot.start();

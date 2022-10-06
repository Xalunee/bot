import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

export const formatter = (str) => cheerio.load(str).text();

export const decoder = (data) => {
  const body = Buffer.from(data, 'binary');
  return iconv.decode(body, 'win1251');
}
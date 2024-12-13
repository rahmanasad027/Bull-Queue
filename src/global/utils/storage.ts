import * as fs from 'fs';
import moment from 'moment';
import * as path from 'path';
import { uuid } from 'uuidv4';

export const getPath = (suffix: string) => {
  const prefix = `${suffix}`;

  const year = moment().format('YYYY');
  const month = moment().format('MMMM');

  const path = `${prefix}/${year}/${month}`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  return path;
};

export const filename = (name: string) => {
  const extension = path.extname(name).slice(1);

  const id = uuid();

  return `${id}.${extension}`;
};

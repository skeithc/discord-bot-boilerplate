import { readdirSync } from 'fs';
import { join } from 'path';

const commands = readdirSync(__dirname)
  .filter((file) => file.endsWith('.ts') && !file.endsWith('index.ts'))
  // eslint-disable-next-line import/no-dynamic-require,global-require
  .map((file) => require(join(__dirname, file)).default);

export default commands;

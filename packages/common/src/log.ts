import chalk from 'chalk';

const log = console.log;
const warn = console.warn;
const error = console.error;

const white = chalk.white;
const green = chalk.green;
const yellow = chalk.yellow;
const red = chalk.red;

const stringify = item => JSON.stringify(item, null, 2);

export function info(msg) {
  log(`${white(new Date().toISOString())} ${green('log')} ${stringify(msg)}`)
}

export function warning(msg) {
  warn(`${white(new Date().toISOString())} ${yellow('warn')} ${stringify(msg)}`)
}

export function fatal(msg) {
  error(`${white(new Date().toISOString())} ${red('error')} ${stringify(msg)}`)
}

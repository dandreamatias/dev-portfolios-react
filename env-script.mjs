import * as fs from 'fs';

const conf = process.argv.slice(2)[0].slice(2);

try {
  const data = fs.readFileSync(`./src/environments/env.${conf}.js`, 'utf8');
  fs.writeFileSync(`./src/environments/env.js`, data, { encoding: 'utf8' });
} catch (err) {
  console.error(err);
}

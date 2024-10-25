const path = require('path');
const fs = require('fs');
const json = require('../package.json');

function last (arr) {
  if (Array.isArray(arr)) {
    return arr[arr.length - 1];
  }
}

function publish() {
  try {
    const version = `1.0.${Number(last(json.version.split('.'))) + 1}`;
    json.version = version;
    const data = JSON.stringify(json, null, 2) + '\n';
    fs.writeFileSync(path.resolve(__dirname, '../package.json'), data);
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e);
  }
};

publish();

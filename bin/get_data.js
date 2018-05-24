#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const nconf = require('nconf');
const defaults = require('../defaults');

nconf.argv()
  .env({
    separator: '__',
    lowerCase: true
  })
  .file({ file: 'config.json' })
  .defaults(defaults)
  .required(['api:key', 'api:token', 'api:list']);

const config = nconf.get();

async function main() {
  // get all
  const data = await writeResponseToFile(config.dest.all);

  // get labels
  const labelsList = getLabels(data);
  fs.writeFileSync(path.resolve(config.dest.root, config.dest.tags), JSON.stringify(labelsList));

  // get by label
  for (const label of labelsList) {
    const current = data.filter(({ labels }) => labels.some(({id}) => id === label.id));
    fs.writeFileSync(path.resolve(config.dest.root, config.dest.tag, `${label.name}.json`), JSON.stringify(current));
  }

  // get by id
  for (const entry of data) {
    fs.writeFileSync(path.resolve(config.dest.root, config.dest.post, `${entry.name}.json`), JSON.stringify(entry));
  }
}

async function writeResponseToFile(name) {
  const { fields } = config;
  const { key, token } = config.api;
  const request = {
    method: 'get',
    baseURL: config.api.url,
    url: `lists/${config.api.list}/cards`,
    params: Object.assign({}, {...fields }, { key }, { token })
  };

  const apiResponse = await axios.request(request);
  fs.writeFileSync(path.resolve(config.dest.root, name), JSON.stringify(apiResponse.data));
  return apiResponse.data;
}

function getLabels(data) {
  const allLabels = data.map(({ labels }) => labels);
  const fLabels = Array.prototype.concat(...allLabels); // flatten
  const labelsList = [...new Set(fLabels)]; // unique
  return labelsList;
}

main()
  .catch(console.error);

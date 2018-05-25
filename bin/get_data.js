#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const nconf = require('nconf');
const defaults = require('../defaults');

// read config hierarchically from:
nconf.argv()          // cli arguments
  .env({              // env variables
    separator: '__',  // separator for nested values
    lowerCase: true   // convert to lowercase
  })
  .file({ file: 'config.json' })  // config.json file
  .defaults(defaults)             // fallback to the default
  .required(['api:key', 'api:token', 'api:list']);  // required fields

const config = nconf.get();

async function main() {
  const { dest } = config;

  // helper to write JSON files to the provided location inside the root folder
  const writeToFile = (location, data) =>
    fs.writeFileSync(path.resolve(dest.root, location), JSON.stringify(data));

  // get all entries sending a HTTP request
  const data = await requestData();
  writeToFile(dest.all, data);

  // get all labels (tags) in data
  const labelsList = getLabels(data);
  writeToFile(dest.tags, labelsList);

  // write a file with all entries for each label
  for (const label of labelsList) {
    const current = data.filter(({ labels }) => labels.some(({id}) => id === label.id));
    writeToFile(path.join(dest.tag, `${label.name}.json`), current);
  }

  // write a file for each entry
  for (const entry of data) {
    writeToFile(path.join(dest.post, `${entry.name}.json`), entry);
  }
}

async function requestData() {
  const { fields } = config;
  const { key, token } = config.api;
  const request = {
    method: 'get',
    baseURL: config.api.url,
    url: `lists/${config.api.list}/cards`,
    params: Object.assign({}, {...fields }, { key }, { token })
  };

  const apiResponse = await axios.request(request);
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

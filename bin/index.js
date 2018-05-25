#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const meow = require('meow');
const mkdir = require('make-dir');
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

// helper to write JSON files to the provided location inside the root folder
const writeToFile = async (location, data) => {
  const fullPath = path.resolve(config.dest.root, location);
  try {
    await mkdir(path.dirname(fullPath));
    fs.writeFileSync(fullPath, JSON.stringify(data));
  } catch (err) {
    throw new Error(`Error writing ${fullPath}`);
  }
}

const requestData = async() => {
  const { fields } = config;
  const { key, token } = config.api;
  const request = {
    method: 'get',
    baseURL: config.api.url,
    url: `lists/${config.api.list}/cards`,
    params: Object.assign({}, {...fields }, { key }, { token })
  };

  try {
    const apiResponse = await axios.request(request);
    return apiResponse.data;
  } catch (err) {
    throw new Error(`Error requesting ${config.api.url}`);
  }
}

function getLabels(data) {
  const allLabels = data.map(({ labels }) => labels);
  const fLabels = Array.prototype.concat(...allLabels); // flatten
  const labelsList = [...new Set(fLabels)]; // unique
  return labelsList;
}

const cli = meow(`
  Usage
  $ staticms
  Run staticms

  $ staticms --help
  Print this help message

  $ staticms --version
  Print the current version

  Examples
  $ staticms --api.key=XXX --api.token=XXX --api.list=XXX

  Run the script to request the remote JSON files and save
  them locally.
  You can alternatively pass the configuration options as
  environment variables or writing them to config.json.
  See the online documentation for further information
`);

main()
  .catch(err => console.error(err.message));

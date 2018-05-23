require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const LIST_ID = process.env.LIST_ID;
const API_KEY = process.env.API_KEY;
const API_TOKEN = process.env.API_TOKEN;
const LIST_NAME = process.env.LIST_NAME;

const DEST = process.env.DEST || path.resolve('src', 'static');
const POST_DEST = process.env.POST_DEST || 'post';
const TAG_DEST = process.env.TAG_DEST || 'tag';
const TAG_FILENAME = process.env.TAG_FILENAME || 'tags.json'
const ALL_FILENAME = process.env.ALL_FILENAME || 'all.json';
const FIELDS = process.env.FIELDS || ['id', 'name', 'dateLastActivity', 'desc', 'idList', 'labels'].join();
const ATTACHMENTS_FIELDS = process.env.ATTACHMENTS_FIELDS || ['previews', 'url'].join();
const USER_FIELDS = process.env.USER_FIELDS || ['fullName', 'bio'].join();
const API_URL = process.env.API_URL || `https://api.trello.com/1/`;
const CARD_SUFFIX = `/cards?fields=${FIELDS}&attachments=true&attachment_fields=${ATTACHMENTS_FIELDS}&members=true&member_fields=${USER_FIELDS}&key=${API_KEY}&token=${API_TOKEN}`;

const client = axios.create({baseURL: API_URL});

async function main() {
  // get all
  let apiPath = `lists/${LIST_ID}`.concat(CARD_SUFFIX);
  const data = await writeResponseToFile(apiPath, ALL_FILENAME);

  // get labels
  const labelsList = getLabels(data);
  fs.writeFileSync(path.resolve(DEST, TAG_FILENAME), JSON.stringify(labelsList));

  // get by label
  for (const label of labelsList) {
    const current = data.filter(({ labels }) => labels.some(({id}) => id === label.id));
    fs.writeFileSync(path.resolve(DEST, TAG_DEST, `${label.name}.json`), JSON.stringify(current));
  }

  // get by id
  for (const entry of data) {
    fs.writeFileSync(path.resolve(DEST, POST_DEST, `${entry.name}.json`), JSON.stringify(entry));
  }
}

async function writeResponseToFile(apiPath, name) {
  const apiResponse = await client.get(apiPath);
  fs.writeFileSync(path.resolve(DEST, name), JSON.stringify(apiResponse.data));
  return apiResponse.data;
}

function getLabels(data) {
  const allLabels = data.map(({ labels }) => labels);
  const fLabels = Array.prototype.concat(...allLabels); // flatten
  const uLabels = [...new Set(fLabels.map(e => JSON.stringify(e)))]; // unique
  const labelsList = Array.from(uLabels).map(e => JSON.parse(e));
  return labelsList;
}

main();

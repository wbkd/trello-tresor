require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const LIST_ID = process.env.LIST_ID;
const API_KEY = process.env.API_KEY;
const API_TOKEN = process.env.API_TOKEN;
const LIST_NAME = process.env.LIST_NAME;

const DEST = process.env.DEST || path.resolve('src', 'static');
const FIELDS = process.env.FIELDS || ['id', 'name', 'dateLastActivity', 'desc', 'idList', 'labels'].join();
const ATTACHMENTS_FIELDS = process.env.ATTACHMENTS_FIELDS || ['previews', 'url'].join();
const USER_FIELDS = process.env.USER_FIELDS || ['fullName', 'bio'].join();
const API_URL = `https://api.trello.com/1/`;
const CARD_SUFFIX = `/cards?fields=${FIELDS}&attachments=true&attachment_fields=${ATTACHMENTS_FIELDS}&members=true&member_fields=${USER_FIELDS}&key=${API_KEY}&token=${API_TOKEN}`;

const client = axios.create({baseURL: API_URL});

async function main() {
  // get all
  let apiPath = `lists/${LIST_ID}`.concat(CARD_SUFFIX);
  const data = await writeResponseToFile(apiPath, 'all.json');

  // for each label
  for (const post of data) {
    for (const label of post.labels) {
      // get posts for each label
      apiPath = `/search?query=label:${label.name}+list:${LIST_NAME}&card_fields=${FIELDS}&card_attachments=true&attachment_fields=${ATTACHMENTS_FIELDS}&card_members=true&member_fields=${USER_FIELDS}&key=${API_KEY}&token=${API_TOKEN}`;
      await writeResponseToFile(apiPath, `${label.name}.json`);
    }
  }
}

async function writeResponseToFile(apiPath, name) {
  const apiResponse = await client.get(apiPath);
  fs.writeFileSync(path.resolve(DEST, name), JSON.stringify(apiResponse.data));
  return apiResponse.data;
}

main();

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const LIST_ID = process.env.LIST_ID;
const API_KEY = process.env.API_KEY;
const API_TOKEN = process.env.API_TOKEN;

const DEST = process.env.DEST || path.resolve('src', 'static');
const FIELDS = process.env.FIELDS || ['id', 'name', 'dateLastActivity', 'desc', 'idList', 'labels'].join();
const ATTACHMENTS_FIELDS = process.env.ATTACHMENTS_FIELDS || ['preview', 'url'].join();
const USER_FIELDS = process.env.USER_FIELDS || ['fullName', 'bio'].join();
const API_URL = `https://api.trello.com/1/lists/${LIST_ID}/cards?fields=${FIELDS}&attachments=true&attachment_fields=${ATTACHMENTS_FIELDS}&members=true&member_fields=${USER_FIELDS}&key=${API_KEY}&token=${API_TOKEN}`;


async function main() {
  const apiResponse = await axios.get(API_URL);
  fs.writeFileSync(path.resolve(DEST, 'all.json'), JSON.stringify(apiResponse.data));
}

main();

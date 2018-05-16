require('dotenv').config();
const Bundler = require('parcel-bundler');

const LIST_ID = process.env.LIST_ID;
const API_KEY = process.env.API_KEY;
const API_TOKEN = process.env.API_TOKEN;
const FIELDS = process.env.FIELDS || ['id', 'name', 'dateLastActivity', 'desc', 'idList', 'labels'].join();
const ATTACHMENTS_FIELDS = process.env.ATTACHMENTS_FIELDS || ['preview', 'url'].join();
const USER_FIELDS = process.env.USER_FIELDS || ['fullName', 'bio'].join();
const API_URL = `https://api.trello.com/1/lists/${LIST_ID}/cards
                  ?fields=${FIELDS}
                  &attachments=true
                  &attachment_fields=${ATTACHMENTS_FIELDS}
                  &members=true
                  &member_fields=${USER_FIELDS}
                  &key=${API_KEY}
                  &token=${API_TOKEN}`;

class API extends Bundler.Packager {
  async start() {
    this.apiResponse = await axios.get(API_URL);
  }

  async addAsset(asset) {
    // @FIXME: add file to the bundle
    await this.bundle.addAsset(this.apiResponse);
  }

  async end() {
      await this.dest.write(this.apiResponse);
  }
}

async function main() {
    const bundler = new Bundler('src/index.html');
    bundler.addPackager('api', API);

    const bundle = await bundler.bundle();
}

main();

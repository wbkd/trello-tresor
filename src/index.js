const path = require('path');
const config = require('./lib/config');
const request = require('./lib/request');
const Writer = require('./lib/writeJSON');
const paginate = require('./lib/paginate');

module.exports = async () => {
  const {dest, pagination} = config;
  const writer = new Writer(dest.root);

  // get all entries sending a HTTP request
  const data = await request(config);
  const pages = paginate(data, pagination);
  for (const page of pages) {
    writer.writeToFile(path.join(dest.all, `${page.currentPage}.json`), page);
  }

  // get all labels (tags) in data
  const labelsList = getLabels(data);
  writer.writeToFile(dest.tagList, labelsList);

  // write a file with all entries for each label
  for (const label of labelsList) {
    const matchIds = ({id}) => id === label.id;
    const filterEntries = ({labels}) => labels.some(matchIds);
    const current = data.filter(filterEntries);
    const paginateCurrent = paginate(current, pagination);
    for (const page of paginateCurrent) {
      writer.writeToFile(path.join(dest.tags, `${label.name}`, `${page.currentPage}.json`), page);
    }
  }

  // write a file for each entry
  for (const entry of data) {
    writer.writeToFile(path.join(dest.post, `${entry.id}.json`), entry);
  }
};

function getLabels(data) {
  const extractLabels = ({labels}) => labels;
  const allLabels = data.map(extractLabels);
  const fLabels = Array.prototype.concat(...allLabels); // flatten
  const labelsList = [...new Set(fLabels)]; // unique
  return labelsList;
}

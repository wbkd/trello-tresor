const path = require('path');
const config = require('./lib/config');
const request = require('./lib/request');
const Writer = require('./lib/writeJSON');

module.exports = async () => {
  const {dest} = config;
  const writer = new Writer(dest.root);

  // get all entries sending a HTTP request
  const data = await request(config);
  const pages = paginate(data);
  for (const page of pages) {
    writer.writeToFile(path.join(dest.all, `${page.currentPage}.json`), page);
  }

  // get all labels (tags) in data
  const labelsList = getLabels(data);
  const labelsPages = paginate(labelsList);
  for (const page of labelsPages) {
    writer.writeToFile(path.join(dest.tags, `${page.currentPage}.json`), page);
  }

  // write a file with all entries for each label
  for (const label of labelsList) {
    const matchIds = ({id}) => id === label.id;
    const filterEntries = ({labels}) => labels.some(matchIds);
    const current = data.filter(filterEntries);
    const paginateCurrent = paginate(current);
    for (const page of labelsPages) {
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

function paginate(data) {
  const {pagination} = config;
  const totalCount = data.length;
  const numberOfPages = Math.ceil(totalCount / pagination.entriesPerPage);

  const pages = [];
  for (let currentPage = 0; currentPage < numberOfPages; currentPage++) {
    const start = currentPage * pagination.entriesPerPage;
    const end = start + pagination.entriesPerPage;
    const res = {
      totalCount,
      numberOfPages,
      currentPage,
      data: data.slice(start, end)
    };
    pages.push(res);
  }
  return pages;
}

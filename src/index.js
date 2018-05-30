const path = require('path');
const config = require('./lib/config');
const request = require('./lib/request');
const Writer = require('./lib/writeJSON');

module.exports = async () => {
  const {dest} = config;
  const writer = new Writer(config.dest.root);

  // get all entries sending a HTTP request
  const data = await request(config);
  writer.writeToFile(dest.all, data);

  // get all labels (tags) in data
  const labelsList = getLabels(data);
  writer.writeToFile(dest.tags, labelsList);

  // write a file with all entries for each label
  for (const label of labelsList) {
    const matchIds = ({id}) => id === label.id;
    const filterEntries = ({labels}) => labels.some(matchIds);
    const current = data.filter(filterEntries);
    writer.writeToFile(path.join(dest.tag, `${label.name}.json`), current);
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

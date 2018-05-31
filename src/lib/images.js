const fs = require('fs');
const url = require('url');
const path = require('path');
const axios = require('axios');
const mkdir = require('make-dir');

module.exports = (entry, dest) => {
  entry.attachments = entry.attachments.map(async attachment => {
    const previews = attachment.previews.map(preview => requestAndWrite(preview, dest));
    attachment.previews = await Promise.all(previews);
    return attachment;
  });

  return entry;
}

const requestAndWrite = async (preview, dest) => {
  const filePath = url.parse(preview.url).path;
  const localPath = path.join(dest, filePath);
  const absolutePath = path.resolve(localPath);

  try {
    await mkdir(path.dirname(absolutePath));
    const response = await axios({
      method: 'get',
      url: preview.url,
      responseType: 'stream'
    })

    response.data.pipe(fs.createWriteStream(absolutePath));
    await new Promise((resolve, reject) => response.data.on('end', resolve));

    preview.url = filePath.toString();
    return preview;
  } catch (err) {
    console.log(err)
    throw new Error(`Error writing ${absolutePath}`);
  }
}

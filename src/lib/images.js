const fs = require('fs');
const url = require('url');
const path = require('path');
const axios = require('axios');
const mkdir = require('make-dir');

module.exports = async (entry, dest) => {
  const promises = [];
  entry.attachments = entry.attachments.map(attachment => {
    attachment.previews = attachment.previews.map(async preview => {
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

        preview.url = filePath.toString();
        promises.push(new Promise((resolve, reject) => response.data.on('end', resolve)));
      } catch (err) {
        throw new Error(`Error writing ${absolutePath}`);
      }

      return preview;
    });
    return attachment;
  });

  await Promise.all(promises);
  return entry;
}

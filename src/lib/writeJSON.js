const fs = require('fs');
const path = require('path');
const mkdir = require('make-dir');

// helper to write JSON files to the provided location inside the root folder
class Writer {
  constructor(root) {
    this.root = root;
  }

  async writeToFile(location, data) {
    const fullPath = path.resolve(this.root, location);
    try {
      await mkdir(path.dirname(fullPath));
      fs.writeFileSync(fullPath, JSON.stringify(data));
    } catch (err) {
      throw new Error(`Error writing ${fullPath}`);
    }
  }
}

module.exports = Writer;

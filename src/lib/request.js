const axios = require('axios');

module.exports = async config => {
  const {fields} = config;
  const {key, token, url, list} = config.api;

  const request = list => requests(list, url, fields, key, token);
  if (typeof list === 'string') {
    return request([list]);
  } else {
    return request(list.reverse());
  }
};

const requests = (listIds, url, fields, key, token) =>
  listIds.reduce(async (prev, list) => {
    const collection = await prev;
    const req = {
      method: 'get',
      baseURL: url,
      url: `lists/${list}/cards`,
      params: Object.assign({}, {...fields}, {key}, {token})
    };

    try {
      const apiResponse = await axios.request(req);
      return collection.concat(apiResponse.data);
    } catch (err) {
      throw new Error(`Error requesting ${url}`);
    }
  }, Promise.resolve([]));

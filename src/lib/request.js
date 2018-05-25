const axios = require('axios');

module.exports = async (config) => {
  const { fields } = config;
  const { key, token } = config.api;
  const request = {
    method: 'get',
    baseURL: config.api.url,
    url: `lists/${config.api.list}/cards`,
    params: Object.assign({}, {...fields }, { key }, { token })
  };

  try {
    const apiResponse = await axios.request(request);
    return apiResponse.data;
  } catch (err) {
    throw new Error(`Error requesting ${config.api.url}`);
  }
}

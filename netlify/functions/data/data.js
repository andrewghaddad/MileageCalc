const axios = require('axios');
const config = require('../../../config');

const handler = async (req) => {
  try {
    const requestData = req.body;
    const headers  = {
        'Content-Type': 'application/json',
        'api-key': config.API_KEY,
        'Accept': 'application/json'
    }
    const response = await axios.post(config.BASE_URL + '/action/find', requestData , { headers });
    const documents = response.data.documents;
    return {
      statusCode: 200,
      body: JSON.stringify({ documents }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
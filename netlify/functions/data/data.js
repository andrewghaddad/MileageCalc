const config = require('../../../config');
const { MongoClient } = require('mongodb');

const uri = config.URI;
const dbName = 'Mileage';
const client = new MongoClient(uri);

const handler = async (req) => {
  try {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('Dev');

    // Find all documents
    const docs = await collection.find({}).toArray();

    console.log('Found the following documents:');
    console.log(docs);
    return {
      statusCode: 200,
      body: JSON.stringify({ docs }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
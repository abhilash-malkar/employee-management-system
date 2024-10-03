const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:Zbw7YtRqPHU4BYdU@cluster0.zma5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connect() {
  await client.connect();
  const database = client.db('emdb');
  return database;
}   

module.exports = connect;
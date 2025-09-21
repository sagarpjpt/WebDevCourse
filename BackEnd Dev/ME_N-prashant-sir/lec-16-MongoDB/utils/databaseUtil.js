const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://root:password_123@clusterairbnb.2vv7oxe.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAirbnb";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
        callback()
        _db = client.db('airbnb');
    })
    .catch((err) => {
      console.log("error while connecting to mongodb ", err);
    });
};

const getDB = () => {
  if(!_db){
    throw new Error('Mongo not connected');
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

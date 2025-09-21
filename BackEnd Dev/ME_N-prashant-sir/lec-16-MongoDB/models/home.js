// core module
const { getDB } = require("../utils/databaseUtil");
const { ObjectId } = require('mongodb')
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    if(_id) {
      this._id = _id;
    }
    this.description = description;
  }

  save() {
    const db = getDB();
    if(this._id) { //update/edit field
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description
      }
      return db.collection("homes").updateOne(
        { _id: new ObjectId(String(this._id)) },
        { $set: updateFields}
      )
    } else { //insert new home
      return db
      .collection("homes")
      .insertOne(this).then(result => {
        console.log(result)
      });
    }
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("homes")
      .find()
      .toArray()
      .then((homes) => {
        console.log(homes);
        return homes;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next()
      .then((home) => {
        console.log(home);
        return home;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(homeId) {
    const db = getDB()
    return db.collection("homes").deleteOne({_id: new ObjectId(String(homeId))});
  }
};

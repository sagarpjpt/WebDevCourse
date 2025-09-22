
// core module
const mongoose = require("mongoose");
const favourite = require("./favourite");

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photoUrl: { type: String, required: true },
  description: { type: String, required: false },
});

homeSchema.pre('findOneAndDelete', async function(next) {
  const homeId = this.getQuery()['_id'];
  await favourite.deleteMany({houseId: homeId});
  next();
});

module.exports = mongoose.model("Home", homeSchema); // 'Home' => collection name in db will be 'homes'

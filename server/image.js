const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  username: String,
  location: String,
  imgUrl: String,
  imgId: String,
});

module.exports = mongoose.model("image", imageSchema);

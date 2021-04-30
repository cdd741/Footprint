const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  email: String,
  location: String,
  imgUrl: String,
  imgId: String,
  likes: Number,
});

module.exports = mongoose.model("Image", imageSchema);

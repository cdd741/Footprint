const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
  },
  imgUrl: {
    type: String,
    required: true,
    unique: true,
  },
  imgId: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
  },
});

module.exports = mongoose.model("Image", imageSchema);

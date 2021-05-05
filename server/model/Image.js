const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  timestemp: {
    type: Date,
    required: true,
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
  comments: {
    type: Array,
    comment: {
      type: Object,
      commentId: {
        type: Number,
        unique: true,
        required: true,
      },
      user: {
        type: Object,
        userId: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
      },
      description: {
        type: String,
        required: true,
      },
      timestemp: {
        type: Number,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("Image", imageSchema);

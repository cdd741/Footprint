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
    avatar: {
      type: String,
    },
  },
  timestemp: {
    type: Number,
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
  description: {
    type: String,
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
        avatar: {
          type: String,
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

const express = require("express");
const router = express.Router();

const {
  getImage,
  uploadImage,
  getImageById,
  deleteImageById,
  commentById,
  likeById,

  getUserImageById,
  getLocationImageById,
} = require("../controllers/post.js");

router.get("/", getImage);
router.post("/", uploadImage);
router.get("/:id", getImageById);
router.delete("/:id", deleteImageById);
router.post("/:id/comment", commentById);
router.post("/:id/like", likeById);

router.get("/user/:id", getUserImageById);
router.get("/location/:id", getLocationImageById);

module.exports = router;

const express = require("express");
const router = express.Router();

//controllers from inventories
const {
  getImage,
  uploadImage,
  getImageById,
  deleteImageById,
  commentById,
  likeById,
} = require("../controllers/post.js");

router.get("/", getImage);
router.post("/", uploadImage);
router.get("/:id", getImageById);
router.delete("/:id", deleteImageById);
router.post("/:id/comment", commentById);
router.post("/:id/like", likeById);

module.exports = router;

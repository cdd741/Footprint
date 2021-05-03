const express = require("express");
const router = express.Router();

//controllers from inventories
const {
  uploadImage,
  getImageById,
  deleteImageById,
} = require("../controllers/post.js");

router.post("/", uploadImage);
router.get("/:id", getImageById);
router.get("/:id", deleteImageById);

module.exports = router;

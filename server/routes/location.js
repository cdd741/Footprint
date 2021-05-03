const express = require("express");
const router = express.Router();

const {
  getImageByLocation,
} = require("../controllers/location.js");

router.get(":city", getImageByLocation);

module.exports = router;
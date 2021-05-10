const express = require("express");
const router = express.Router();

const {
  addData,
} = require("../controllers/mockdata.js");

router.get(":city", addData);

module.exports = router;
const express = require("express");
const router = express.Router();

//controllers from inventories
const { getUserId, signup, signin, putUserId } = require("../controllers/user");

//routes
router.get("/:id", getUserId);
router.post("/signup", signup);
router.post("/signin", signin);
router.put("/:id", putUserId);

module.exports = router;

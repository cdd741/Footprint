const express = require("express");
const router = express.Router();


//controllers from inventories
const { getUserById, signup, signin } = require("../controllers/user.js");

//routes
router.get("/:id", getUserById);
router.post("/signup", signup);
router.post("/signin", signin);
// router.put("/:id", putUserById);

module.exports = router;

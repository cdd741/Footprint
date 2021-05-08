const express = require("express");
const router = express.Router();

//controllers from inventories
const {
  getUserById,
  signup,
  signin,
  // uploadAvatar,
} = require("../controllers/user.js");

//routes
router.get("/:id", getUserById);
// router.get("/avatar/:id", uploadAvatar);
router.post("/signup", signup);
router.post("/signin", signin);
// router.put("/:id", putUserById);

module.exports = router;

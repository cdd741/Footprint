const User = require("./User.js");
const uuid = require("uuid");
const path = require("path");

// User create
function signup(req, res) {
  let obj = {
    username: req.body.username,
    userId: req.body.userId,
    password: req.body.userId,
    email: req.body.email,
  };

  User.create(obj, (err, _item) => {
    if (err) {
      console.log(err);
      res.status(400).send("create user mother fucker");
    }
  });
}

function getUserId(req, res) {
  User.findOne({ userId: "noname" }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", docs);
    }
  });
}

module.exports = {
  getUserId,
  signup,
  signin,
  putUserId,
};

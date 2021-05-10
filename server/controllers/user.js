const User = require("../model/User");
const { v4: uuidv4 } = require("uuid");


// User create
const signup = (req, res) => {
  const obj = {
    userId: uuidv4(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email.toLowerCase(),
    bio: req.body.bio,
    avatar: req.body.avatar,
  };
  User.create(obj, (err, _item) => {
    if (err) {
      console.log(err);

      // Code 400 means Bad Request
      res.status(400).send("Cannot create user");
    } else {
      // Code 201 means Created
      res.status(201).send({
        userId: obj.userId,
        username: obj.username,
        email: obj.email,
        bio: obj.bio,
        avatar: obj.avatar,
      });
    }
  });
};

// User Signin
function signin(req, res) {
  User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        // mongoose will return null if not found this user
        // Code 403 means Forbidden
        res.status(403).send("Cannot find this user");
        console.log("Cannot find this user");
      } else {
        if (req.body.password === user.password) {
          // Code 200 means Found
          res.status(200).send({
            userId: user.userId,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
          });
          console.log("Correct password, user can signin");
        } else {
          // Code 403 means Forbidden
          res.status(403).send("Correct password");
          console.log("Wrong password");
        }
      }
    }
  });
}

// This method will find the user with the specific userId in database
// It will return the use with his/her description and posted images.
async function getUserById(req, res) {
  const user = await User.findOne({ userId: req.params.id });

  if (!user) {
    // mongoose will return null if not found this user
    // Code 403 means Forbidden
    res.status(403).send("Cannot find this user");
    console.log("Cannot find this user");
  } else {
    res.status(302).send(user);
  }
}

module.exports = {
  getUserById,
  signup,
  signin,
  // putUserById,
};

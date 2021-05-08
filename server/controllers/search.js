const Image = require("../model/Image");
const User = require("../model/User");

async function search(req, res) {
  if (!req.body.searchTerm) {
    res.send({});
    return;
  }
  let locQuery = await Image.find({
    location: { $regex: req.body.searchTerm, $options: "i" },
  })
    .sort({ likes: 1 })
    .limit(10);

  let userQuery = await User.find({
    username: { $regex: req.body.searchTerm, $options: "i" },
  })
    .sort({ likes: 1 })
    .limit(10);

  if (!locQuery) {
    // mongoose will return null if not found this image
    // Code 403 means Forbidden
    res.status(403).send("Cannot find an image with that prefix");
    console.log("Cannot find an image with that prefix");
  } else if (!userQuery) {
    res.status(403).send("Cannot find a user with that prefix");
    console.log("Cannot find a user with that prefix");
  } else {
    console.log(userQuery);
    locatoins = locQuery.reduce((acc, item) => {
      acc[item.location] = 1;
      return acc;
    }, {});

    users = userQuery.reduce((acc, item) => {
      acc[item.username] = item.userId;
      return acc;
    }, {});

    let query = { location: locatoins, user: users };
    // console.log(query)

    res.status(200).send(query);
  }
}

module.exports = {
  search,
};

const Image = require("../model/Image");
const User = require("../model/User");

function search(req, res) {
  let locQuery = Image.find({ location: {"$regex": req.body.searchTerm, "$options": "i"}});

  let userQuery = User.find({ username: {"$regex": req.body.searchTerm,"$options": "i"}});

  if (!locQuery) {
    // mongoose will return null if not found this image
    // Code 403 means Forbidden
    res.status(403).send("Cannot find an image with that prefix");
    console.log("Cannot find an image with that prefix");
  } 

  else if (!userQuery)
  {
    res.status(403).send("Cannot find a user with that prefix");
    console.log("Cannot find a user with that prefix");
  }
  else
  {
    locQuery.limit(10);
    userQuery.limit(10);

    locQuery.sort({ likes: 1 });
    userQuery.sort({ likes: 1 });

    let query = { location: locQuery, user: userQuery };

    res.status(200).send(query);
  }



}

module.exports = {
  search,
};

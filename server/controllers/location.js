const Image = require("../model/Image");

async function getImageByLocation(req, res) {
  let query = await Image.find({ location: req.params.city });

  // limit our results to 10 items
  query.limit(10);

  // sort by age
  query.sort({ likes: 1 });

  if (!query) {
    // mongoose will return null if not found this image
    // Code 403 means Forbidden
    res.status(403).send("Cannot find an image in this location");
    console.log("Cannot find this image");
  } else {
    res.status(200).send(query);
  }
}

module.exports = {
  getImageByLocation,
};

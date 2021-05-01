const Image = require("./Image.js");

async function getImageByLocation(req, res){
    var query = await Image.find({ location: req.params.city });

    // limit our results to 5 items
    query.limit(10);

    // sort by age
    query.sort({ likes: 1 });

    if (!query) 
    {
      // mongoose will return null if not found this image
      // Code 403 means Forbidden
      res.status(403).send("Cannot find an image in this location");
      console.log("Cannot find this image");
    } else 
    {
      // Code 302 means Found
      res.status(302).send(query);
    }

}


module.exports = {
  getImageByLocation,
};

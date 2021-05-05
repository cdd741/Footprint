const multer = require("multer");
const Image = require("../model/Image");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: "./Public/uploads",
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000, files: 1 },
}).single("file");

// Image uploa d
const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send("ERROR occur during upload image", err);
    }

    const obj = {
      user: { userId: req.body.userId, username: req.body.username },
      location: req.body.location,
      description: req.body.description,
      likes: 0,
      imgUrl: `http://localhost:8080/uploads/${req.file.filename}`,
      imgId: uuidv4(),
      timestemp: Date.now(),
    };

    Image.create(obj, (err, _item) => {
      if (err) {
        console.log(err);
        res.status(400).send("upload imag");
      } else {
        res.status(201).send(obj);
      }
    });

    // res.status(201).send(obj);
  });
};

// Image get
const getImageById = async (req, res) => {
  Image.find({ imgId: req.params.id }, (err, items) => {
    if (err) {
      console.log(err);
      Image.deleteMany({});
      res.status(400).send("find image with id error");
    } else {
      if (!items) {
        // mongoose will return null if not found this image
        // Code 403 means Forbidden
        res.status(403).send("Cannot find this image");
        console.log("Cannot find this image");
      } else {
        res.status(200).send(items);
      }
    }
  });
};

const getImage = async (req, res) => {
  Image.find({}, (err, items) => {
    console.log(items);
    if (err) {
      console.log(err);
      Image.deleteMany({});
      res.status(400).send("find image with empty error");
    } else {
      if (items.length === 0) {
        // mongoose will return null if not found this image
        // Code 403 means Forbidden
        res.status(403).send("Does not exit any image in database");
        console.log("Does not exit an image in database");
      } else {
        // query.limit(10);
        // query.sort({ likes: 1 });
        res.status(200).send(items);
      }
    }
  });
};

// Image Delete
const deleteImageById = (req, res) => {
  User.deleteOne({ imgId: req.params.id }, function (err) {
    if (err) {
      console.log(err);

      // Code 400 means Bad Request
      res.status(400).send("Cannot delete, error occour");
    } else {
      // Code 204 means resource deleted successfully
      res.status(204).send("Image resource deleted successfully");
    }
  });
};

const commentById = async (req, res) => {
  const postId = req.params.id;
  const postComment = {
    commentId: uuidv4(),
    user: {
      userId: req.body.userId,
      username: req.body.username,
    },
    description: req.body.comment,
    timestemp: Date.now(),
  };
  await Image.findOneAndUpdate(
    { imgId: postId },
    { $push: { comments: postComment } },
    done
  );
  const updatedImage = await Image.findOne({ imgId: postId });
  res.status(201).send(updatedImage);
};

module.exports = {
  uploadImage,
  getImageById,
  getImage,
  deleteImageById,
  commentById,
};

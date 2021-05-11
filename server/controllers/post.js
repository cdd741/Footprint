const multer = require("multer");
const Image = require("../model/Image");
const User = require("../model/User");
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

function findUserAvatar(postid) {
  return User.findOne({ userId: postId }).exec();
}

// Image uploa d
const uploadImage = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send("ERROR occur during upload image", err);
    }

    const obj = {
      user: {
        userId: req.body.userId,
        username: req.body.username,
        avatar: req.body.avatar,
      },
      location: req.body.location,
      description: req.body.description,
      likes: 0,
      imgUrl: `uploads/${req.file.filename}`,
      imgId: uuidv4(),

      timestemp: Date.now(),
    };

    Image.create(obj, (err, _item) => {
      if (err) {
        console.log(err);
        res.status(404).send("upload imag error");
      } else {
        res.status(201).send(obj);
        console.log(obj);
      }
    });
  });
};

function getimage(postId) {
  return Image.findOne({ imgId: postId }).exec();
}

function findRandomtImg() {
  var curdate = Date.now();
  return Image.findOne({ timestemp: { $lte: curdate } }).exec();
}

function getPreRandomImg(img_id) {
  return Image.find({ imgId: { $gt: img_id } })
    .sort({ imgId: 1 })
    .limit(1)
    .exec();
}

function getNextRandomImg(img_id) {
  return Image.find({ imgId: { $lt: img_id } })
    .sort({ imgId: -1 })
    .limit(1)
    .exec();
}

function findfirstRandomimg() {
  return Image.find({}).sort({ imgId: -1 }).limit(1).exec();
}

function findlastRandomimg() {
  return Image.find({}).sort({ imgId: 1 }).limit(1).exec();
}

// Image get
const getImageById = async (req, res) => {
  let postId = req.params.id;

  console.log("postid", postId);
  let curImg = await getimage(postId);
  console.log(curImg);

  let previous = await getPreRandomImg(curImg.imgId);
  let next = await getNextRandomImg(curImg.imgId);

  let preImgId = "";
  let nextImgId = "";

  if (previous.length == 1) {
    preImgId = previous[0].imgId;
  } else {
    let last = await findlastRandomimg();
    preImgId = last[0].imgId;
  }

  if (next.length == 1) {
    nextImgId = next[0].imgId;
  } else {
    let first = await findfirstRandomimg();
    nextImgId = first[0].imgId;
  }

  const obj = {
    previousId: preImgId,
    curImgObj: curImg,
    nextId: nextImgId,
  };

  res.send(obj);
};

const getImage = async (_req, res) => {
  let item = await findRandomtImg();
  if (item) {
    img_id = item.imgId;
  } else {
    res.status(404);
    return;
  }
  let previous = await getPreRandomImg(img_id);
  let next = await getNextRandomImg(img_id);

  let preImgId = "";
  let nextImgId = "";

  if (previous.length == 1) {
    preImgId = previous[0].imgId;
  } else {
    let last = await findlastRandomimg();
    preImgId = last[0].imgId;
  }

  if (next.length == 1) {
    nextImgId = next[0].imgId;
  } else {
    let first = await findfirstRandomimg();
    nextImgId = first[0].imgId;
  }

  const obj = {
    previousId: preImgId,
    curImgObj: item,
    nextId: nextImgId,
  };

  res.send(obj);
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
      userId: req.body.user.userId,
      username: req.body.user.username,
      avatar: req.body.user.avatar,
    },
    comment: req.body.comment,
    timestemp: Date.now(),
  };

  const filter = { imgId: postId };
  let item = await Image.findOneAndUpdate(
    filter,
    { $push: { comments: postComment } },
    { new: true }
  );

  // console.log(item)
  res.status(201).send(item);
};

const likeById = async (req, res) => {
  const postId = req.params.id;

  let pic = await Image.findOne({ name: postId });
  let newLikes = pic.likes + 1;

  const filter = { name: postId };
  const update = { likes: newLikes };

  let updatedImage = await Character.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.status(201).send(updatedImage);
};

function findUserNextImg(postdate, userId) {
  return Image.find({ timestemp: { $gt: postdate } })
    .find({ userId: userId })
    .sort({ timestemp: 1 })
    .limit(1)
    .exec();
}

function findUserPreImg(postdate, userId) {
  return Image.find({ timestemp: { $lt: postdate } })
    .find({ userId: userId })
    .sort({ timestemp: -1 })
    .limit(1)
    .exec();
}

const getUserImageById = async (req, res) => {
  const postId = req.params.id;
  console.log("postid", postId);
  let item = await getimage(postId);

  console.log("getuserimagebyid", item);

  let postdate = item.timestemp;
  let userId = item.user.userId;

  let previous = await findUserPreImg(postdate, userId);
  let next = await findUserNextImg(postdate, userId);

  let preImgId = "";
  let nextImgId = "";

  if (previous.length == 1) {
    preImgId = previous[0].imgId;
  } else {
    preImgId = "This is the last image";
  }

  if (next.length == 1) {
    nextImgId = next[0].imgId;
  } else {
    nextImgId = "This is the last image";
  }

  const obj = {
    previousId: preImgId,
    curImgObj: item,
    nextId: nextImgId,
  };

  res.send(obj);
};

function getPreImg(img_id, img_location) {
  return Image.find({ imgId: { $gt: img_id } })
    .find({ location: img_location })
    .sort({ imgId: 1 })
    .limit(1)
    .exec();
}

function getNextimg(img_id, img_location) {
  return Image.find({ imgId: { $lt: img_id } })
    .find({ location: img_location })
    .sort({ imgId: -1 })
    .limit(1)
    .exec();
}

function findfirstimg(img_location) {
  return Image.find({ location: img_location })
    .sort({ imgId: -1 })
    .limit(1)
    .exec();
}

function findlastimg(img_location) {
  return Image.find({ location: img_location })
    .sort({ imgId: 1 })
    .limit(1)
    .exec();
}

function findRandomLocImg(img_location) {
  return Image.findOne({ location: img_location }).limit(1).exec();
}

const getLocationImageById = async (req, res) => {
  const img_location = req.params.id;

  let item = await findRandomLocImg(img_location);

  let img_id = item.imgId;
  let img_likes = item.likes;

  let previous = await getPreImg(img_id, img_location);
  let next = await getNextimg(img_id, img_location);

  let preImgId = "";
  let nextImgId = "";

  if (previous.length == 1) {
    preImgId = previous[0].imgId;
  } else {
    let last = await findlastimg(img_location);
    preImgId = last[0].imgId;
  }

  if (next.length == 1) {
    nextImgId = next[0].imgId;
  } else {
    let first = await findfirstimg(img_location);
    nextImgId = first[0].imgId;
  }

  const obj = {
    previousId: preImgId,
    curImgObj: item,
    nextId: nextImgId,
  };
  console.log("log", obj);
  console.log("log user", obj.curImgObj.user);
  res.send(obj);
};

module.exports = {
  uploadImage,
  getImageById,
  getImage,
  deleteImageById,
  commentById,
  likeById,
  getUserImageById,
  getLocationImageById,
};

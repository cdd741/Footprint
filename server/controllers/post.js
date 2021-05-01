const multer = require("multer");
const Image = require("./Image.js");

const Storage = multer.diskStorage({
    destination: "../public/uploads/",
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: Storage,
    limits: { fileSize: 100000000, files: 1 },
}).single("Image");

// Image upload
function uploadImage(req, res) {
    upload(req, res ,(err)=>{
        if (err)
        {
            return res.status(500).send(err);
        }
        const obj = 
        {
            username: req.body.username,
            location: req.body.location,
            likes: 0,
            imgUrl: `http://localhost:8080/uploads/${req.file.filename}`,
            imgId: uuidv4(),
        };
        Image.create(obj, (err, _item) => {
            if (err) 
            {
                console.log(err);
                res.status(400).send("upload imag");
            }
        });
        res.status(201).send(obj.imgId);
    })
}

// Image get
async function getImageById(req, res) {
    const image = await Image.findOne({ imgId: req.params.id });

    if (!image)   // mongoose will return null if not found this image
    {
        // Code 403 means Forbidden
        res.status(403).send("Cannot find this image");
        console.log("Cannot find this image");
    }
    else{
      // Code 302 means Found
      res.status(302).send(image);
    }
}

// Image Delete
const deleteImageById = (req, res) => {
    User.deleteOne({ imgId: req.params.id }, function (err) {
      if (err) 
      {
        console.log(err);

        // Code 400 means Bad Request
        res.status(400).send("Cannot delete, error occour");
      }
      else
      {
        // Code 204 means resource deleted successfully
        res.status(204).send("Image resource deleted successfully");
      }
    });
};


module.exports = {
  uploadImage,
  getImageById,
  deleteImageById,
};



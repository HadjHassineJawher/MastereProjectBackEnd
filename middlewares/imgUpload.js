const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "assets/images");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Select an image type plz .."), false);
  }
};

const Upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = Upload;

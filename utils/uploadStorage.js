const multer = require("multer");

// Upload local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storages"); // Set the destination path for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Call cb() after your logic
  },
});

module.exports = multer({ storage });

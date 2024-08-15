const multer = require("multer");

// Upload local
const storage = multer.memoryStorage();

module.exports = multer({ storage });

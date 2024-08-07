const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dp8hjnxt7",
  api_key: "922893483816676",
  api_secret: "R0WVmdCcku9dwCobYUj4Hf5_mAo",
  secure: true,
});

module.exports = cloudinary;

const { S3Client } = require("@aws-sdk/client-s3");
const { S3 } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Create S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// console.log("process.env", process.env);

// Set up multer storage for S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET,
    acl: "public-read", // Set permissions for the uploaded files
    key: function (req, file, cb) {
      cb(null, `profile_images/${Date.now().toString()}_${file.originalname}`); // Use timestamp to avoid name conflicts
    },
  }),
});

module.exports = { s3Client, upload };

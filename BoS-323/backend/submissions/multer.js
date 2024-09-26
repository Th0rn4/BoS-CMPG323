const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Allowed video extensions
    const filetypes = /mp4|mov|avi|wmv/;
    // Check extension
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime type
    const mimetype = file.mimetype.startsWith("video/");

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Error: Unsupported file type. Please upload a video file (mp4, mov, avi, or wmv)."
        )
      );
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
});

const multer = require('multer');
const path = require('path');

// Multer config
module.exports = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Allowed video extensions
    const filetypes = /pdf|doc|docx/;
    // Check extension
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          'Error: Unsupported file type. Please upload a video file (pdf|doc|docx).'
        )
      );
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
});

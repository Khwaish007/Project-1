const multer = require('multer');

// Store files in memory instead of on disk
const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image or video! Please upload only supported files.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB file size limit
  },
});

module.exports = upload;
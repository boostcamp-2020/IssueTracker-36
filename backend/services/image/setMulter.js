const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } });

const setMulter = async (req, res, next) => {
  upload.single('img')(req, res, next);
};

module.exports = setMulter;

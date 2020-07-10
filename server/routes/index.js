const express = require('express');
const { uploader } = require('../middleware/multerFile');
const router = express.Router();

// Controllers
const { uploadFile } = require('../controllers/womboController');

// Routes
router.post('/list/upload', uploader.any(), uploadFile);

module.exports = router;

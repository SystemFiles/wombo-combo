const multer = require('multer');
const express = require('express');
const router = express.Router();

// Utils
const storage = multer.memoryStorage();
const uploader = multer({ storage: storage });

// Controllers
const { uploadFile } = require('../controllers/womboController');

// Routes
router.post('/list/upload', uploader.any(), uploadFile);

module.exports = router;

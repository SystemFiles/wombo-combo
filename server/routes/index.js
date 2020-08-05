const express = require('express')
const { uploader } = require('../middleware/multerFile')
const router = express.Router()

// Controllers
const { uploadFile, getComboFile } = require('../controllers/womboController')

// Routes
router.post('/list/upload', uploader.any(), uploadFile)
router.get('/list/download', getComboFile)

module.exports = router

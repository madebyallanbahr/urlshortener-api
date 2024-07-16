const express = require('express');
const router = express.Router();

const urlController = require('../controllers/urlController');  

router.get('/api/', urlController.show);

router.get('/:urlID', urlController.redirectURL);

router.post('/api/short', urlController.generateURL);

module.exports = router;
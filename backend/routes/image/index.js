const { Router } = require('express');
const service = require('../../services').image;

const router = Router();

router.post('/image', service.setMulter, service.uploadImage);

module.exports = router;

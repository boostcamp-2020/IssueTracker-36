const { Router } = require('express');

const router = Router();
const service = require('../../services').user;

// get
router.get('/test', service.getTest);
// post
// put
// delete

module.exports = router;

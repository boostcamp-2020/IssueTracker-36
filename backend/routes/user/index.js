const { Router } = require('express');

const router = Router();
const service = require('../../services').user;

// get
router.get('/users', service.getUsers);

// post
// put
// delete

module.exports = router;

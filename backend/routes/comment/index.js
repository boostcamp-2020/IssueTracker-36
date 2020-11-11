const { Router } = require('express');

const router = Router();
const service = require('../../services').comment;

// post
router.post('/comment', service.addComment);
// patch
// delete

module.exports = router;

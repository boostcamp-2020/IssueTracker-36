const { Router } = require('express');

const router = Router();
const service = require('../../services').comment;

// post
router.post('/comment', service.addComment);
// patch
// delete
router.delete('/comment/:id', service.deleteComment);

module.exports = router;

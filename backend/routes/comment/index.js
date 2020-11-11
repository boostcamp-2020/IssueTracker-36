const { Router } = require('express');

const router = Router();
const service = require('../../services').comment;

// post
router.post('/comment', service.addComment);

// patch
router.patch('/comment/:id', service.updateComment);

// delete
router.delete('/comment/:id', service.deleteComment);

module.exports = router;

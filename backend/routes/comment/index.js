const { Router } = require('express');

const router = Router();
const service = require('../../services').comment;

// post
router.post('/comment', service.addComment);
router.post('/comment/:id/reaction', service.addReaction);

// patch
router.patch('/comment/:id', service.updateComment);

// delete
router.delete('/comment/:id', service.deleteComment);
router.delete('/comment/:cid/reaction/:rid', service.deleteReaction);

module.exports = router;

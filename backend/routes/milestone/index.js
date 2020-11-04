const { Router } = require('express');

const router = Router();
const service = require('../../services').milestone;

// get
router.get('/milestones', service.getMilestones);

// post
// put
// delete

module.exports = router;

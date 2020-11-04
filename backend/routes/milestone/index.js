const { Router } = require('express');

const router = Router();
const service = require('../../services').milestone;

// get
router.get('/milestones', service.getMilestones);
router.get('/milestone/:id', service.getMilestone);

// post
// put
// delete

module.exports = router;

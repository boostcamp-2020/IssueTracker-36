const { Router } = require('express');

const router = Router();
const service = require('../../services').milestone;

// get
router.get('/milestones', service.getMilestones);
router.get('/milestone/:id', service.getMilestone);

// post
router.post('/milestone', service.addMilestone);

// put
// delete

module.exports = router;

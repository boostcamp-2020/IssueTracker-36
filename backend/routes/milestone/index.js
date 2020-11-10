const { Router } = require('express');

const router = Router();
const service = require('../../services').milestone;

// get
router.get('/milestones', service.getMilestones);
router.get('/milestone/:id', service.getMilestone);

// post
router.post('/milestone', service.addMilestone);

// patch
router.patch('/milestone/:id', service.updateMilestone);

// delete
router.delete('/milestone/:id', service.deleteMilestone);

module.exports = router;

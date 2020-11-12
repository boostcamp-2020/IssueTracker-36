const { Router } = require('express');

const router = Router();
const service = require('../../services').issue;

// get
router.get('/issues', service.getIssues);
router.get('/issue/:id', service.getIssue);

// post

router.post('/issue', service.addIssue);
router.post('/issue/:issueId/user/:userId', service.addIssueUser);
router.post('/issue/:issueId/label/:labelId', service.addIssueLabel);
router.post('/issue/:issueId/milestone/:labelId', service.addIssueMilestone);
// patch
router.patch('/issues', service.patchIssues);
router.patch('/issue/:id', service.editIssue);

// delete
router.delete('/issue/:id', service.deleteIssue);
router.delete('/issue/:issueId/user/:userId', service.deleteIssueUser);
router.delete('/issue/:issueId/label/:labelId', service.deleteIssueLabel);
router.delete('/issue/:issueId/milestone/:labelId', service.deleteIssueMilestone);

module.exports = router;

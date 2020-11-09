const { Router } = require('express');

const router = Router();
const service = require('../../services').issue;

// get
router.get('/issues', service.getIssues);
router.get('/issue/:id', service.getIssue);

// post

router.post('/issue', service.addIssue);
router.post('/issue/:issue_id/user/:user_id', service.addIssueUser);
router.post('/issue/:issue_id/label/:label_id', service.addIssueLabel);
// patch
router.patch('/issues', service.patchIssues);
router.patch('/issue/:id', service.editIssue);

// delete

module.exports = router;

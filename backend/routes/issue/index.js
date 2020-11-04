const { Router } = require('express');

const router = Router();
const service = require('../../services').issue;

// get
router.get('/issues', service.getIssues);
router.get('/issue/:id', service.getIssue);

// post
// patch
router.patch('/issue/:id', service.editIssue);

// delete

module.exports = router;

const { Router } = require('express');

const router = Router();
const service = require('../../services').label;

// get
router.get('/labels', service.getLabel);

// post
// put
// delete

module.exports = router;

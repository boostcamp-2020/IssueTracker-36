const { Router } = require('express');

const router = Router();
const service = require('../../services').label;

// get
router.get('/labels', service.getLabels);

// post
// put
// delete
router.delete('/label/:id', service.deleteLabel);

module.exports = router;

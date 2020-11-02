require('dotenv').config();

const { Router } = require('express');
const { getUser } = require('./get-accesstoken');
const service = require('../../services/user/add-user');

const router = Router();

router.post('/auth/oauth/github', getUser, service);

module.exports = router;

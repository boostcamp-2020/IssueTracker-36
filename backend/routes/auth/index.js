const { Router } = require('express');
const { getUser } = require('./get-accesstoken');
const addUser = require('../../services/user/add-user');

const router = Router();

router.post('/auth/oauth/github', getUser, addUser);

module.exports = router;

const { Router } = require("express");

const router = Router();
const service = require("../../service").test;

// get
router.get("/test", service.getTest);

// post

//put

//delete

module.exports = router;

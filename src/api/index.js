const express = require("express");

const router = express.Router();
router.use("/sample", require("./sample"));

module.exports = router;

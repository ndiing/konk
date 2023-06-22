const Controller = require("./controller");
const express = require("express");

const router = express.Router();
router.use(Controller.init);
router.post("/", Controller.post);
router.get("/", Controller.get);
router.patch("/", Controller.patch);
router.delete("/", Controller.delete);

module.exports = router;

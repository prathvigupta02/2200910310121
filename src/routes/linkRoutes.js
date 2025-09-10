const express = require("express");
const { shortenUrl, redirectUrl } = require("../Controller/linkController");

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:code", redirectUrl);

module.exports = router;

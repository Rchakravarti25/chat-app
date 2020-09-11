var express = require('express');

var page = require("../controllers/page");


var router = express.Router();

router.get("/",page.index);


module.exports = router;
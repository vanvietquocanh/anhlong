var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.user);
	// res.redirect("/dashboard/search")
});

module.exports = router;

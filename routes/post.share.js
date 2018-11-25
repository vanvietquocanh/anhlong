var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var pathDB = require("./mongodb.path");
/* POST users listing. */
router.post('/', function(req, res, next) {
	mongo.connect(pathDB,(err,db)=>{
		db.collection("scripts").insertOne(req.body, (err,result)=>{
			res.redirect("/dashboard/share")
		})
	})
});

module.exports = router;

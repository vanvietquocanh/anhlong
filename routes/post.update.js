var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var pathDB = require("./mongodb.path");
/* POST users listing. */
router.post('/', function(req, res, next) {
	if(req.user){
		mongo.connect(pathDB,(err,db)=>{
			req.body.time = Date.now()
			var id = ObjectId(req.body._id);
			delete req.body._id;
			db.collection("scripts").updateOne({_id: id}, {$set: req.body}, {upsert : true}, (err,result)=>{
				res.redirect("/dashboard/share")
			})
		})
	}else{
		res.redirect("/error")
	}
});

module.exports = router;
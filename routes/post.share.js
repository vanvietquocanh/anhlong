var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var pathDB = require("./mongodb.path");
/* POST users listing. */
router.post('/', function(req, res, next) {
	if(req.user){
		mongo.connect(pathDB,(err,db)=>{
			req.body.id = req.user.id
			req.body.name = req.user.displayName
			req.body.time = Date.now()
			req.body.email = req.user.emails[0].value
			db.collection("scripts").insertOne(req.body, (err,result)=>{
				res.redirect("/dashboard/share")
			})
		})
	}else{
		res.redirect("/error")
	}
});

module.exports = router;
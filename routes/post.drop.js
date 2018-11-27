var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var pathDB = require("./mongodb.path");
var ObjectId = require('mongodb').ObjectId;
const assert = require('assert');


/* POST users listing. */
router.post('/', function(req, res, next) {
	if(req.user){
		mongo.connect(pathDB,(err,db)=>{
			var collectionName; 
			switch(req.query.script){
				case "1":
					collectionName = "scripts";
					break;
				case "0":
					collectionName = "users";
					break;
			}
			db.collection(collectionName).deleteOne({_id:ObjectId(req.body.id)}, (err, result)=>{
				db.close();
				if(!err){
					res.send("success")
				}else{
					res.send("error")
				}
			})
		})
	}else{
		res.redirect("error")
	}
});

module.exports = router;
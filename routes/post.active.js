var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var pathDB = require("./mongodb.path");
var ObjectId = require('mongodb').ObjectId;
const assert = require('assert');


/* POST users listing. */
router.post('/:action', function(req, res, next) {
	if(req.params.action==="active"||req.params.action==="inactive"){
		mongo.connect(pathDB,(err,db)=>{
			db.collection("users").updateOne({_id:ObjectId(req.body.id)}, {$set : {users : (req.params.action==="active")?true:false}}, (err, result)=>{
				db.close();
				if(!err){
					res.send("success")
				}else{
					res.send("error")
				}
			})
		})
	}else{
		res.send("error")
	}
});

module.exports = router;
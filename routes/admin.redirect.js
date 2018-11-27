var express = require('express');
var router = express.Router();
var passport = require("passport")
var admin = require("./idAdmin");
var mongo = require("mongodb");
var pathDB = require("./mongodb.path")

/* GET users listing. */
router.get('/', function(req, res, next) {
	passport.authenticate('facebook',{session: true})(req, res, function () {
  		if(req.user){
  			if(req.user.id === admin){
		  		res.redirect('/dashboard/admin?active=false');
			}else{
				mongo.connect(pathDB,(err,db)=>{
					db.collection("users").findOne({id:req.user.id},(err, result)=>{
						if(result){
							db.close();
							if(result.users){
		  						res.redirect('/dashboard/search');
							}else{
								res.send(`<h1><a href="https://www.facebook.com/caytroan">Vui lòng liên hệ facebook anh Long!</a> <a href="tel:0911343737">Hoặc Số điện thoại</a></h1>`);
							}
						}else{
							req.user.users = false;
							req.user.time = Date.now();
							db.collection("users").updateOne({id:req.user.id}, {$set:req.user}, {upsert:true},(err, result)=>{
								db.close();
								res.send(`<h1><a href="https://www.facebook.com/caytroan">Vui lòng liên hệ facebook anh Long!</a> <a href="tel:0911343737">Hoặc Số điện thoại</a></h1>`)
							})
						}
		  			})
		  		})
			}
  		}else{
  			res.redirect("error")
  		}
	});
});

module.exports = router;

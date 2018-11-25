var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var pathDB = require("./mongodb.path")
/* GET users listing. */
router.get('/:param', function(req, res, next) {
	console.log(req.user);
	if(req.user){
		mongo.connect(pathDB,(err,db)=>{
			db.collection("scripts").find().toArray((err,result)=>{
				if(req.params.param==="search"||req.params.param==="share"){
					var control = require(`./control.${req.params.param}`)
					var view = {}; 
							if(req.params.param==="share"){
								view = `<th scope="col">Sửa / Xóa</th>`
							}else{
								view = ""
							}
							res.render("dashboardUser",{"control":control, "view" : view, "data" : result, "title":req.params.param});
				}else{
					res.redirect("/error");
				}
			})
		})
	}else{
		res.redirect("/")
	}
});

module.exports = router;

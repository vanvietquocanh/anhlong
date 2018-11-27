var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var pathDB = require("./mongodb.path")
var admin = require("./idAdmin");

/* GET users listing. */
router.get('/:param', function(req, res, next) {
	if(req.user){
		var customForAdmin = "";
		if(req.user.id===admin){
			customForAdmin+=`<li class="nav-item">
						      	<a class="nav-link text-light" style="line-height: 3em;" href="/dashboard/admin?active=true">Thành Viên</a>
						    </li>
						    <li class="nav-item">
						      	<a class="nav-link text-light" style="line-height: 3em;" href="/dashboard/admin?active=false">Xin Vào</a>
						    </li>`;
		}
		if(req.user.id===admin&&req.params.param==="admin"){
			mongo.connect(pathDB,(err,db)=>{
				db.collection("users").find({users : (req.query.active==="true")?true:false}).toArray((err, result)=>{
					db.close();
					res.render("dashboardAdmin",{"typeControls" : req.query.active, "userName": req.user.displayName, "customForAdmin" : customForAdmin, "image": req.user.photos[0].value, "users" : result})
				})
			})
		}else{
			var query = {};
			for (var i = 0; i < Object.keys(req.query).length; i++) {
				if(req.query[Object.keys(req.query)[i]]!==""){
					query[Object.keys(req.query)[i]] = req.query[Object.keys(req.query)[i]];
				}
			}
			if(req.params.param==="search"||req.params.param==="share"){
				if(req.params.param === "share"){
					query.name = req.user.displayName;
				}
				mongo.connect(pathDB,(err,db)=>{
					db.collection("scripts").find(query).sort({time: -1 }).limit(30).toArray((err,result)=>{
						db.close()
						var control = require(`./control.${req.params.param}`)
						var view = {}; 
						if(req.params.param==="share"){
							view = `<th scope="col">Sửa / Xóa</th>`
						}else{
							view = ""
						}
						res.render("dashboardUser",{"userName": req.user.displayName, "customForAdmin" : customForAdmin, "image": req.user.photos[0].value,"control":control, "view" : view, "data" : result, "title":req.params.param});
					})
				})
			}else{
				res.redirect("/error");
			}
		}
	}else{
		res.redirect("/")
	}
});

module.exports = router;

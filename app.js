var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));	



//set up routes

app.get("/", function(req, res){
	res.render("index");
})

app.get("/searching", function(req, res){
	res.send("woooHoo!");

	//input value from search
	var val = req.query.search;
	console.log(val);
})

app.listen(3000, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("The magic happens on port 3000");
	}
})


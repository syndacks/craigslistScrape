var express = require("express");
var request = require("request");
var app = express();

app.set("view engine", "jade");
app.use(express.static('public'));	



//set up routes

app.get("/", function(req, res){
	res.render("index");
});

app.get('/searching', function(req, res){

	 // input value from search
	 var val = req.query.search;

	// url used to search yql
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
	"%20where%20location%3D%22sfbay%22%20and%20type%3D%22jjj%22%20and%20query%3D%22" + val + "%22&format=" +
	"json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	console.log(url);

	request(url, function(err, resp, body){
		body = JSON.parse(body);
		console.log(body);
		//logic used to compare search results with the input from user
		if(!body.query.results.RDF.item){
			craig = "No results found. Try again.";
		} else {
			results = body.query.results.RDF.item[0]['about'];
			// console.log(craig);
			craig = '<a href="'+results+'">'+results+'</a>'
		}
			res.send(craig);
	});
});

app.listen(3000, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("The magic happens on port 3000");
	}
})


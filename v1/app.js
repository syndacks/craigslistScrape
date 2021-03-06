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
	"%20where%20location%3D%22sfbay%22%20and%20type%3D%22bia%22%20and%20query%3D%22" + val + "%22&format=" +
	"json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

	requests(url, function(data){
		res.send(data);
	});
});

app.get("/search", function(req, res){
	res.render("search");
})

function requests(url, callback){
	//request module processes the yql url and return the results in JSON
	request(url, function(err, resp, body){
		var resultsArray = [];
		//use request to parse the body of the URL into JSON
		body = JSON.parse(body);
		console.log(body.query.results.RDF.item);
		//logic used to compare search results with the input from user
		if(!body.query.results.RDF.item){
			results = "No results found. Try again.";
			callback(results);
		} else {
			results = body.query.results.RDF.item;
			for(var i = 0; i<results.length; i++){
				resultsArray.push(
					{title:results[i].title[0], about:results[i]["about"], desc:results[i]["description"]}
				);
			};
		};
		console.log(resultsArray);
		//pass back the results to client side
		callback(resultsArray);
	});
};

app.listen(3000, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("The magic happens on port 3000");
	}
})
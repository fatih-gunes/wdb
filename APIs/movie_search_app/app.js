const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");


app.get("/", function(req, res) {
	res.render("search");
});

app.get("/results", function(req, res) {
	var query = req.query.search;
	var url = "http://omdbapi.com/?apikey=thewdb&s=" + query;
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			// console.log(error);
			// console.log(response.statusCode);
			const data = JSON.parse(body);
			
		   	// if (data.Search != undefined) {
				//console.log(data);
				//console.log(data.Search == undefined);
				//res.send(data.Search[0].Title);
				res.render("results", {data: data});
			// }
		}
	});
});





app.listen(3000, function() {
	console.log("Movie App has started!!!");
});
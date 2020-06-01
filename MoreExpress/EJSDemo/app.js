var express = require("express");
var app = express();

app.use(express.static("public")); // add name of the directory
app.set("view engine", "ejs"); // set rendering file endins as ejs


app.get("/", function (req, res) {
	res.render("home"); // alternatively, "home.ejs"
	
	// res.send("<h1>Welcome to the homepage!!!<h1>");
});

app.get("/fallinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	
	res.render("love", {thingVar: thing}); // love.ejs
	// res.send("You fell in love with " + th ing);
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "My adorable pet bunny", author: "Charlie"},
		{title: "Can you believe this pomsky?", author: "Colt"},
	];
	
	res.render("posts", {posts: posts});
})



app.listen(3000, function() {
	console.log("Server is listening!!!<");
});


var express = require("express");

var app = express();

app.get("/", function (req, res) {
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function (req, res) {
	var animalName = req.params.animal.toLowerCase();
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof"
	}
	
	var sound = sounds[animalName];
	console.log(animalName);
	res.send("The "+ animalName + " says " + sound + ".");
});

app.get("/repeat/:word/:repeatNumber", function(req, res) {
	var repeatWord = req.params["word"]; // params.word
	var repeatNumber = Number(req.params["repeatNumber"]); // also params.repeatNumber
	//console.log("params:" + repeatWord + ":" + repeatNumber + ":");
	var responseString = "";
	for(var i = 0; i < repeatNumber; i++) {
		responseString += repeatWord;
		if (i != repeatNumber-1) {
			responseString += " ";
		}
	}
	//console.log(responseString);
	res.send(responseString);
});

app.get("*", function(req, res) {
	res.send("Sorry page not found.");
});

app.listen(3000, function() {
	console.log("Application started...");
});

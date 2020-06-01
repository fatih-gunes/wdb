var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

// from: https://mongoosejs.com/docs/deprecations.html
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// name      url            verb    desc.
// ==================================================================
// INDEX     /dogs          GET     Display a list of all dogs
// NEW       /dogs/new      GET     Displays form to make a new dog
// CREATE    /dogs          POST    Add new dog to DB
// SHOW      /dogs/:id      GET     Shows info about one dog
// EDIT      /dogs/:id/edit GET     Show edit form for one dog
// UPDATE    /dogs/:id      PUT     Update a particular dog, then redirect somewhere
// DESTROY   /dogs/:id      DELETE  Delete a particular dog, then redirect somewhere




// Campground.create(
// 	{
// 		name: "Mountain Goat's Rest", 
// 		image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg",
// 		description: "This is a huge granit hill, no bathrooms. No water. Beautiful granite!"
// 	},
	
// 	function(err, campground) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND: ");
// 		console.log(campground);
// 	}
// });





app.get("/", function(req, res) {
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds:allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
	//res.send("You hit the post route!");
	// get date from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var newCampground = {name: name, image: image, description: desc}
	// campgrounds.push(newCampground);

	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	})

	// redirect back to campgrounds page
	// res.redirect("/campgrounds");
	
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	// Find the campground with the provided Id
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});


	// res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
});



app.listen(3000, function() {
	console.log("The YelpCamp Server Has Started!");
});
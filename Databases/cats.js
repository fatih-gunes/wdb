var mongoose = require("mongoose");

// from: https://mongoosejs.com/docs/deprecations.html
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/cat_app");


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);



// adding a new cat to the DB

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat) {
//     if(err) {
//         console.log("SOMETHING WENT WRONG!");
//     } else {
//         console.log("We just saved a cat to the db:");
//         console.log(cat);
//     }
// });

//or: 

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log("cat added:");
        console.log(cat);
    }
});

// retrieve all cats from the DB and console.log each one

// Cat.find({}, function(err, cats) {
//     if (err) {
//         console.log("OH NO, ERROR!");
//     }else {
//         console.log("All the cats....");
//         console.log(cats);
//     }
// });

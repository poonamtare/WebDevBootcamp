var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament:String
});

var Cat = mongoose.model("Cat",catSchema);

var george = new Cat(
    {name: "George",
    age:11,
    temperament:"Grouchy"
    });
  
george.save();  
    
// Adding a new cat to DB

// Retrive all cats from DB and console.log each one
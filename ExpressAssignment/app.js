var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment"); 
});

//route to tell animal sounds based on their names
app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moooo",
        dog: "Bowwow",
        cat: "Meoww",
        goldfish:"..."
    };
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The "+ animal +" says '"+sound + "'");
});

// route to repeat a message a certain number of times
app.get("/repeat/:message/:count", function(req, res){
   var count = Number(req.params.count);
   var message = req.params.message;
   var result = "";
   for(var i=0; i<count; i++){
      result+=message + " ";
   }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("Sorry Page not found....WHat are you doing with your life...");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!...")});
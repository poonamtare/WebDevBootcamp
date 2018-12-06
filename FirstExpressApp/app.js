var express = require("express");
var app = express();

// "/" => "Hi!"
app.get("/", function(req, res){
    res.send("Hi There!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye");
});

// "/dogs" => "Bow Wow!"
app.get("/dogs", function(req, res){
    res.send("Bow Wow!");
});

//In order to create patterns for route parameters we use ':'
app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName; 
   res.send(" Welcome to the " + subreddit.toUpperCase() + " page" ); 
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res){
   res.send("Welcome to the comment section!"); 
});

app.get("*", function(req, res){
    res.send("You are a star!!...");
});

// Tell express to listen to requests (start server)

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server has started!...")});

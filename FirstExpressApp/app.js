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


// Tell express to listen to requests (start server)

app.listen(process.env.PORT,process.env.IP, function(){console.log("Server has started!...")});

var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
});

//Demonstrate passing a variable to ejs file
app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs",{thingVar: thing});
});

//Demonstrating how posts are created and how to use EJS loops
app.get("/posts", function(req,res){
    var posts = [
        {title: "Dracula", Author: "Bram Stoker"},
        {title: "Fried Green Tomatoes", Author: "Fannie FLynn"},
        {title: "Circe", Author: "Madeline Miller"}
        ];
        
        res.render("posts.ejs",{posts: posts});
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!...");
});
var express = require("express");
var app = express();// executed as a function

app.use(express.static("public"));//tell express to serve the public directory
app.set("view engine","ejs");//tell express that all templates will be in ejs format

app.get("/", function(req,res){
    res.render("home");
//   res.send("<h1>Welcome to the homepage</h1><h2>Blah Blah</h2>"); 
});

// fallinlovewith/var

app.get("/fallinlovewith/:thing", function(req,res){
    var thing = req.params.thing;
    res.render("love",{thingVar: thing});
});

app.get("/posts", function(req, res) {
  var posts = [
      {title :"My adorable bunny",author: "PT"},
      {title :"My adorable bunny",author: "PT"},
      {title :"Can you believe this Pomsky",author: "PT"}
      ];  
      
      res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server is listening");
});
var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/results",function(req,res){
//   res.send("Hello it works");
     request("http://www.omdbapi.com/?s=california&apikey=thewdb",function(error, response, body){
      if(!error && response.statusCode === "200"){
          var results= JSON.parse(body);
          res.send(results["Search"][0]["Title"]);
      }   
     }); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started");
});
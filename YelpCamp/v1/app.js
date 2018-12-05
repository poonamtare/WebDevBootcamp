var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
        {name:"Salmon Creek", image:"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c43eff2f7cb0c2f6838152683da69f81&auto=format&fit=crop&w=1050&q=80"},
        {name:"Granite Hill", image:"https://images.unsplash.com/photo-1504470695779-75300268aa0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6612fd264e1ef7989694af7ad0b54c1c&auto=format&fit=crop&w=634&q=80"},
        {name:"Mounatin goat's rest", image:"https://images.unsplash.com/photo-1513673953682-c64113e2866a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ac493edfc02a322820703625d747055&auto=format&fit=crop&w=634&q=80"}
        ];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/", function(req, res){
    res.render("landing");
    
});

app.get("/campgrounds",function(req, res){
        res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground ={name:name, image:image};
    campgrounds.push(newCampground);
    //redirect back to campground page
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});
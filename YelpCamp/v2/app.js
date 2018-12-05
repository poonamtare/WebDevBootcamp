var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });
// var campgrounds = [
//         {name:"Salmon Creek", image:"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c43eff2f7cb0c2f6838152683da69f81&auto=format&fit=crop&w=1050&q=80"},
//         {name:"Granite Hill", image:"https://images.unsplash.com/photo-1504470695779-75300268aa0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6612fd264e1ef7989694af7ad0b54c1c&auto=format&fit=crop&w=634&q=80"},
//         {name:"Mounatin goat's rest", image:"https://images.unsplash.com/photo-1513673953682-c64113e2866a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ac493edfc02a322820703625d747055&auto=format&fit=crop&w=634&q=80"}
//         ];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image:String,
    description:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//create a new campground

// Campground.create(
//     {
//         name:"Granite Hill",
//         image:"https://images.unsplash.com/photo-1504470695779-75300268aa0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6612fd264e1ef7989694af7ad0b54c1c&auto=format&fit=crop&w=634&q=80",
//         description:"This is a huge granite hill. No Bathrooms, no water. Beautiful granite!"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("Newly created campground:");
//             console.log(campground);
            
//         }
        
//     });
    
app.get("/", function(req, res){
    res.render("landing");
    
});

//Index: show all campgrounds
app.get("/campgrounds",function(req, res){
    // get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
          res.render("index",{campgrounds:allCampgrounds});   
        }
        
    });
        
});

//Create : Add new campground to DB
app.post("/campgrounds",function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground ={name:name, image:image, description: desc};
    //create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(" campground added to DB");
            res.redirect("/campgrounds");
        }
        
    });
    //redirect back to campground page
    //res.redirect("/campgrounds");
});

// New: Show a form to create a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//SHOW: Shows more information about one campground
app.get("/campgrounds/:id",function(req, res) {
        //find the campground with that provided id
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
            } else {
                //render the show template with that campground
                res.render("show",{campground: foundCampground}); 
            }
            
        });
        
        
           
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started");
});
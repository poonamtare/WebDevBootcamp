var express = require("express"),
    app = express(),
    expressSanitizer = require("express-sanitizer"),
    bodyParser= require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
    
// APP CONFIG    
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());// goes after body-parser

//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "My first blog post",
//     image: "https://images.unsplash.com/photo-1534353875273-b5887cc1abf5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f19b3587a3ced9fadd1abd4716e81212&auto=format&fit=crop&w=600&q=60",
//     body: "This is my first blog post. Hope I will continue writing my thoughts and opinions in this for a long time."
    
// },function(err, blog){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Newly created campground:");
//         console.log(blog);
//     }
// });

//RESTFUL ROUTES

app.get("/", function(req, res) {
   res.redirect("/blogs"); 
});


//INDEX ROUTE
app.get("/blogs",function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
    
});

//NEW ROUTE
app.get("/blogs/new",function(req, res) {
    res.render("new.ejs");
});

//CREATE ROUTE
app.post("/blogs",function(req,res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        } else {
            //then redirect to index 
            res.redirect("/blogs");
        }
    });
    
});

//SHOW ROUTE
app.get("/blogs/:id",function(req, res) {
    Blog.findById(req.params.id,function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show",{blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE APP
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/"+ req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});

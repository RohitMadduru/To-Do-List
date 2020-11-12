const express = require('express');
const bodyPrser = require('body-parser');

const app = express();

let feilds = ["dbmds","os","mpi"];

app.set("view engine","ejs");
app.use(bodyPrser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(request,response){

let today = new Date();
let options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};

let day = today.toLocaleDateString("en-US",options);

response.render("app",{fullDate: day, newItem: feilds });
});

app.post("/",function(req,res){

    var feild = req.body.newFeild;
    feilds.push(feild);
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});
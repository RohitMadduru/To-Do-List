const express = require('express');
const bodyPrser = require('body-parser');

const app = express();

let feilds = ["dbmds","os","mpi"];
let codingItems = [];

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

response.render("app",{title: day, newItem: feilds });
});

app.post("/",function(req,res){
    let feild = req.body.newFeild;
    
    if(req.body.feild == "Coding List"){
      codingItems.push(feild);
      res.redirect("/coding");
    }else{
      feilds.push(feild);
      res.redirect("/");
    }
    
    
});

app.get("/coding",function(req, res){
  res.render("app",{title: "Coding List", newItem: codingItems });
})

app.post("/coding",function(req,res){
 

  let feild = req.body.newFeild;
  
  feilds.push(feild);
  res.redirect("/coding");
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});
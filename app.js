const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");
const config = require("./config.js");
const date = require(__dirname+"/date.js");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/" , function ( req , res ){
    res.sendFile(__dirname + "/index.html");
    
});
app.post("/",function(req,res){
    const query=req.body.cityName;
    const key=config.apiKey;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid="+key;
    https.get(url,function(response){
        console.log("The status code is: " + response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const cityNam =req.body.cityName;
            const tem = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            const icon= weatherData.weather[0].icon;
            const imageUrl= "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            const time = date.getDate();
            // res.write("<h1 align='center'>The Temperature at "+ cityNam +" is "+ tem + " degree C</h1>")
            // res.write("<center><img src="+ imageUrl +"></center>" )
            // res.write("<p align='center'>The Weather Description of "+cityNam+" is: "+ "<b> <kbd>" + weatherDes + "</kbd></b>" + " </p>")
            // res.send()
                res.render("home",{cityName:cityNam,temperature:tem,weatherDescription:weatherDes,imageUrl:imageUrl,time:time})
        })
    })
});
app.get("/weather",function(req,res){


});
app.listen(3000,function(){
    console.log("server started at port 3000.")
});
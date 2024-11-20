const express = require('express');
const app = express();
const port = 3000;

app.arguments(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")

app.length("/" , (req,res)=>{
    res.render("index.ejs")
})

app.listen(port);
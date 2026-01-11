let express=require("express");
let bodyParser=require("body-parser");
require("dotenv").config();
let router=require("./route/router.js");

let db=require("../db.js");
let app=express();
app.use(express.static("public"));
app.use(express.static("src"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("views engine","ejs");
app.use(express.json());
app.use("/",router);
const categoryRouter = require("./route/categoryroute.js");
app.use("/", categoryRouter);



module.exports=app;
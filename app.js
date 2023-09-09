const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routers/router');

const sequelize = require('./database/dbConfig');
const Contact = require("./database/model");

const app = express();

// setting static contents
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"node_modules")));

// setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,"views"));

// setting body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router());


sequelize.sync({force: true}).then(()=>{
app.listen(3000, ()=>{
    console.log("server started");
})
}).catch(error =>{
    console.log("error while connecting to db");
})

